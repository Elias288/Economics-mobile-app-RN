import { useState, useEffect } from "react";
import "../types/movementType";
import "../types/categoriesType";

/**
 * @typedef {Object} amountDefaultObject
 * @property {number} totalAmount Monto total (+incomeMovements.amount - spendMovements.amount)
 * @property {Array<categoriesObject>} spendCategories
 * @property {Array<categoriesObject>} incomeCategories
 * @property {Array<movementObject>} incomeMovements
 * @property {Array<movementObject>} spendMovements
 */

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
    {
      date: new Date().toLocaleDateString(),
      amount: 1500,
      desc: "Test",
      cat: "Sueldo",
    },
  ],
  spendMovements: [
    {
      date: new Date().toLocaleDateString(),
      amount: 100,
      desc: "Test",
      cat: "Comida",
    },
  ],
};

function useAmount() {
  const [initialBalance, setInitialBalance] = useState(
    /** @type {number | undefined} */ (undefined)
  );
  const [amounts, setAmounts] = useState(
    /** @type {amountDefaultObject} */ (amountDefault)
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
   * Actualiza las categorías de ingresos o gastos
   * @param {categoriesObject} categories
   * @param {string} type Tipo = income o spend
   */
  const updateCategories = (categories, type) => {
    if (type === "income") {
      setAmounts({ ...amounts, incomeCategories: categories });
    } else {
      setAmounts({ ...amounts, spendCategories: categories });
    }
  };

  /**
   * Actualiza los movimientos de ingreso y el monto Total
   * @param {movementObject} newIncomeMovement
   */
  const updateIncomeMovement = (newIncomeMovement) => {
    setAmounts({
      ...amounts,
      incomeMovements: [...amounts.incomeMovements, newIncomeMovement],
    });
  };

  /**
   * Actualiza los movimientos de gastos y el monto Total
   * @param {movementObject} newSpendMovement
   */
  const updateSpendMovement = (newSpendMovement) => {
    setAmounts({
      ...amounts,
      spendMovements: [...amounts.spendMovements, newSpendMovement],
    });
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
    updateCategories,
    updateIncomeMovement,
    updateSpendMovement,
  };
}

export default useAmount;
