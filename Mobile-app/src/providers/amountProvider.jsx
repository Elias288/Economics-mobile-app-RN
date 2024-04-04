import { createContext, useContext, useEffect, useState } from 'react';

import useCategories from '../hooks/useCategories';
import useMovements from '../hooks/useMovements';
import useTotalAmount from '../hooks/useTotalAmount';

/**
 * @typedef {Object} amountProviderProps
 * @property {number} totalAmount Monto total (+incomeMovements.amount - spendMovements.amount)
 * @property {Array<movementObject>} movements
 * @property {categoryObject[]} categories
 * @property {number} initialBalance
 * @property {(category: string, type: string) => void} addCategory
 * @property {(categoryToDelete: categoryObject) => void} deleteCategory
 * @property {(newMovement: Partial<movementObject>) => void} addMovement
 * @property {(movementId: string) => void} deleteMovement
 * @property {(value: number) => void} chargeInitialAmount
 */

/** @type {import('react').Context<amountProviderProps>} */
const CustomContext = createContext(undefined);

const AmountProvider = ({ children }) => {
  const [initialBalance, setInitialBalance] = useState(0);

  const [totalAmount, calculateTotalAmount] = useTotalAmount(initialBalance);
  const { categories, addCategory, deleteCategory } = useCategories();
  const { movements, changeCategory, addMovement, deleteMovement } = useMovements();

  // Cuando se actualiza el initialBalance, el incomeMovements o el spendMovements se calcula el monto total
  useEffect(() => {
    calculateTotalAmount(movements);
  }, [initialBalance, movements, calculateTotalAmount]);

  /**
   * Elimina categorías
   * @param {categoryObject} categoryToDelete Nombre de categoría a eliminar
   */
  const onDeleteCategory = (categoryToDelete) => {
    // Si la categoría no tiene movimientos, la elimina.
    // Si tiene movimientos, debe:
    // - si no existe la categoría DELETED crearla modificando la categoría a eliminar
    // - si existe la categoría DELETED, elimina la categoría
    // si no tiene movimientos elimina la categoría
    // Si hay movimientos con la categoría eliminada cambiarla a DELETED

    deleteCategory(categoryToDelete.Id);
    changeCategory(categoryToDelete.cat, 'DELETED');
  };

  return (
    <CustomContext.Provider
      value={{
        totalAmount,
        categories,
        initialBalance,
        movements,
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
