import { useState, useEffect } from "react";
import "../types/movementType";
import "../types/categoriesType";
import "../types/balanceType";
import useTotalAmount from "../hooks/useTotalAmount";
import useCategories from "../hooks/useCategories";
import useMovements from "../hooks/useMovements";

/**
 * @typedef {Object} balanceServiceProps
 * @property {number} totalAmount Monto total (+incomeMovements.amount - spendMovements.amount)
 * @property {Array<categoriesObject>} spendCategories
 * @property {Array<categoriesObject>} incomeCategories
 * @property {Array<movementObject>} incomeMovements
 * @property {Array<movementObject>} spendMovements
 * @property {number | undefined} initialBalance
 *
 * @property {(value: number) => void} chargeInitialAmount
 * @property {(category: string, type: string) => void} addCategory
 * @property {(categories: string, type: string) => void} deleteCategory
 * @property {(newMovement: movementObject, type: string) => void} addMovement
 * @property {(movementToDelete: movementObject, type: string) => void} deleteMovement
 * @property {(value: number) => void} chargeInitialAmount
 *
 * @returns {balanceServiceProps}
 */
function balanceService() {
  const [initialBalance, setInitialBalance] = useState(0);
  const [totalAmount, calculateTotalAmount] = useTotalAmount(initialBalance);
  const { spendCategories, incomeCategories, addCategory, deleteCategory } =
    useCategories();
  const {
    incomeMovements,
    spendMovements,
    changeCategory,
    addMovement,
    deleteMovement,
  } = useMovements();

  // Cuando se actualiza el initialBalance, el incomeMovements o el spendMovements se calcula el monto total
  useEffect(() => {
    calculateTotalAmount(incomeMovements, spendMovements);
  }, [initialBalance, incomeMovements, spendMovements]);

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
    changeCategory(categoryToDelete, type, "DELETED");
  };

  return {
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
  };
}

export default balanceService;
