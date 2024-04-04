import { createContext, useContext, useEffect, useState } from 'react';

import useCategories from '../hooks/useCategories';
import useMovements from '../hooks/useMovements';
import useTotalAmount from '../hooks/useTotalAmount';

/**
 * @typedef {Object} amountProviderProps
 * @property {number} totalAmount Monto total (+incomeMovements.amount - spendMovements.amount)
 * @property {Array<categoryObject>} spendCategories
 * @property {Array<categoryObject>} incomeCategories
 * @property {Array<movementObject>} incomeMovements
 * @property {Array<movementObject>} spendMovements
 * @property {number} initialBalance
 * @property {(category: string, type: string) => void} addCategory
 * @property {(categories: string, type: string) => void} deleteCategory
 * @property {(newMovement: movementObject, type: string) => void} addMovement
 * @property {(movementToDelete: movementObject, type: string) => void} deleteMovement
 * @property {(value: number) => void} chargeInitialAmount
 */

/** @type {import('react').Context<amountProviderProps>} */
const CustomContext = createContext(undefined);

const AmountProvider = ({ children }) => {
  const [initialBalance, setInitialBalance] = useState(0);

  const [totalAmount, calculateTotalAmount] = useTotalAmount(initialBalance);
  const { spendCategories, incomeCategories, addCategory, deleteCategory } = useCategories();
  const { incomeMovements, spendMovements, changeCategory, addMovement, deleteMovement } =
    useMovements();

  // Cuando se actualiza el initialBalance, el incomeMovements o el spendMovements se calcula el monto total
  useEffect(() => {
    calculateTotalAmount(incomeMovements, spendMovements);
  }, [initialBalance, incomeMovements, spendMovements, calculateTotalAmount]);

  /**
   * Elimina categorías
   * @param {string} categoryToDelete Nombre de categoría a eliminar
   * @param {string} type Tipo = income o spend
   */
  const onDeleteCategory = (categoryToDelete, type) => {
    // Si la categoría no tiene movimientos, la elimina.
    // Si tiene movimientos, debe:
    // - si no existe la categoría DELETED crearla modificando la categoría a eliminar
    // - si existe la categoría DELETED, elimina la categoría
    // si no tiene movimientos elimina la categoría
    // Si hay movimientos con la categoría eliminada cambiarla a DELETED

    deleteCategory(categoryToDelete, type);
    changeCategory(categoryToDelete, type, 'DELETED');
  };

  return (
    <CustomContext.Provider
      value={{
        totalAmount,
        spendCategories,
        incomeCategories,
        incomeMovements,
        spendMovements,
        initialBalance,
        chargeInitialAmount: setInitialBalance,
        addCategory,
        deleteCategory: onDeleteCategory,
        addMovement,
        deleteMovement,
      }}
    >
      {children}
    </CustomContext.Provider>
  );
};

export function useAmountContext() {
  const context = useContext(CustomContext);
  if (!context) throw Error('useAmountContext debe estar dentro del AmountProvider');

  return context;
}

export default AmountProvider;
