import { useState, useEffect } from "react";
import "../types/movementType";
import "../types/categoriesType";
import "../types/balanceType";

const amountDefault = {
  totalAmount: 0,
  spendCategories: [
    { cat: "Comida", fore: 0 },
    { cat: "Regalos", fore: 0 },
    { cat: "Salud/Médicos", fore: 0 },
    { cat: "Vivienda", fore: 0 },
    { cat: "Transporte", fore: 0 },
    { cat: "Gastos personales", fore: 0 },
    { cat: "Ahorro", fore: 0 },
    {
      cat: "Suministro (luz, agua, gas, etc)",
      fore: 0,
    },
    { cat: "Viajes", fore: 0 },
    { cat: "Deudas", fore: 0 },
    { cat: "Otros", fore: 0 },
    { cat: "Efectivo", fore: 0 },
  ],
  incomeCategories: [
    { cat: "Ahorro", fore: 0 },
    { cat: "Sueldo", fore: 0 },
    { cat: "Bonificaciones", fore: 0 },
    { cat: "Intereses", fore: 0 },
  ],
  incomeMovements: [
    /* {
      date: new Date().toLocaleDateString(),
      amount: 1500,
      desc: "Test",
      cat: "Sueldo",
    }, */
  ],
  spendMovements: [
    /* {
      date: new Date().toLocaleDateString(),
      amount: 100,
      desc: "Test",
      cat: "Comida",
    }, */
  ],
};

/**
 * @typedef {Object} useAmountProps
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
 * @property {(value: number) => void} chargeInitialAmount
 *
 * @returns {useAmountProps}
 */
function useAmount() {
  const [initialBalance, setInitialBalance] = useState(
    /** @type {number | undefined} */ (undefined)
  );
  const [amounts, setAmounts] = useState(
    /** @type {balanceObject} */ (amountDefault)
  );

  // Cuando se actualiza el initialBalance, el incomeMovements o el spendMovements se calcula el monto total
  useEffect(() => {
    calculateTotalAmount();
  }, [initialBalance, amounts.incomeMovements, amounts.spendMovements]);

  /**
   * Calcula el monto total, sumando los ingresos y restando los gastos
   */
  const calculateTotalAmount = () => {
    const totalIncome = amounts.incomeMovements.reduce((total, movimiento) => {
      return total + movimiento.amount;
    }, 0);
    const totalSpend = amounts.spendMovements.reduce((total, movimiento) => {
      return total + movimiento.amount;
    }, 0);

    let iB = initialBalance ? initialBalance : 0;
    setAmounts({
      ...amounts,
      totalAmount: (iB += totalIncome - totalSpend),
    });
  };

  /**
   * Agrega categorías de ingresos o gastos
   * @param {string} newCategory Texto de la categoría
   * @param {string} type Tipo = income o spend
   */
  const addCategory = (newCategory, type) => {
    if (type === "income") {
      setAmounts({
        ...amounts,
        incomeCategories: [
          ...amounts.incomeCategories,
          { cat: newCategory, fore: 0 },
        ],
      });
    } else {
      setAmounts({
        ...amounts,
        spendCategories: [
          ...amounts.spendCategories,
          { cat: newCategory, fore: 0 },
        ],
      });
    }
  };

  /**
   * Elimina categorías
   * @param {string} categoryToDelete Nombre de categoría a eliminar
   * @param {string} type Tipo = income o spend
   */
  const deleteCategory = (categoryToDelete, type) => {
    /**
     * Si la categoría no tiene movimientos, la elimina.
     * Si tiene movimientos, debe:
     * - si no existe la categoría DELETED crearla modificando la categoría a eliminar
     * - si existe la categoría DELETED, elimina la categoría
     * si no tiene movimientos elimina la categoría
     * Si hay movimientos con la categoría eliminada cambiarla a DELETED
     */

    if (type === "income") {
      const existDeleted = amounts.incomeCategories.find(
          (category) => category.cat === "DELETED"
        ), // existe la categoría DELETED
        hasMovements = amounts.incomeMovements.find(
          (movement) => movement.cat === categoryToDelete
        ); // la categoría a eliminar tiene movimientos

      const newIncomeCategories = !hasMovements
        ? amounts.incomeCategories.filter(
            (category) => category.cat !== categoryToDelete
          ) // elimina la categoría
        : !existDeleted
        ? amounts.incomeCategories.map((category) =>
            category.cat === categoryToDelete
              ? { ...category, cat: "DELETED" }
              : category
          ) // convierte las categorías de los movimientos a la categoría DELETED
        : amounts.incomeCategories.filter(
            (category) => category.cat !== categoryToDelete
          ); // elimina la categoría

      const newIncomeMovements = amounts.incomeMovements.map((movement) =>
        movement.cat === categoryToDelete
          ? { ...movement, cat: "DELETED" }
          : movement
      );

      setAmounts({
        ...amounts,
        incomeCategories: newIncomeCategories,
        incomeMovements: newIncomeMovements,
      });
    } else {
      const existDeleted = amounts.spendCategories.find(
          (category) => category.cat === "DELETED"
        ), // existe la categoría DELETED
        hasMovements = amounts.spendMovements.find(
          (movement) => movement.cat === categoryToDelete
        ); // la categoría a eliminar tiene movimientos

      const newSpendCategories = !hasMovements
        ? amounts.spendCategories.filter(
            (category) => category.cat !== categoryToDelete
          ) // elimina la categoría
        : !existDeleted
        ? amounts.spendCategories.map((category) =>
            category.cat === categoryToDelete
              ? { ...category, cat: "DELETED" }
              : category
          ) // convierte las categorías de los movimientos a la categoría DELETED
        : amounts.spendCategories.filter(
            (category) => category.cat !== categoryToDelete
          ); // elimina la categoría

      const newSpendMovements = amounts.spendMovements.map((movement) =>
        movement.cat === categoryToDelete
          ? { ...movement, cat: "DELETED" }
          : movement
      );

      setAmounts({
        ...amounts,
        spendCategories: newSpendCategories,
        spendMovements: newSpendMovements,
      });
    }
  };

  /**
   * Agrega un movimiento de ingreso o gasto
   * @param {movementObject} newMovement Objeto de movimiento
   * @param {string} type Tipo: income o spend
   * @returns void
   */
  const addMovement = (newMovement, type) => {
    if (type === "income") {
      setAmounts({
        ...amounts,
        incomeMovements: [...amounts.incomeMovements, newMovement],
      });
      return;
    }

    if (type === "spend") {
      setAmounts({
        ...amounts,
        spendMovements: [...amounts.spendMovements, newMovement],
      });
      return;
    }
  };

  /**
   * Carga el monto inicial
   * @param {number} value Monto inicial
   */
  const chargeInitialAmount = (value) => {
    setInitialBalance(value); // setea el valor de initial balance
  };

  return {
    ...amounts,
    initialBalance,
    chargeInitialAmount,
    addCategory,
    deleteCategory,
    addMovement,
  };
}

export default useAmount;
