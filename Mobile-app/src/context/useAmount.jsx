import { useState, useEffect } from "react";

/**
 * @typedef {Object} movementObject
 * @property {string} cat Category
 * @property {string} desc Description of movement
 * @property {Number} act Actual movement amount
 */

/**
 * @typedef {Object} categoriesObject
 * @property {string} cat Category
 * @property {number} fore Forecast amount of spending or income
 */

const example = {
  totalAmount: 0,
  categories: [
    {
      cat: "Comida",
      fore: 2000,
    },
    {
      cat: "sueldo",
      fore: 39000,
    },
  ],
  incomeMovements: [
    {
      cat: "Sueldo",
      desc: "Tata: leche",
      act: 39000,
    },
  ],
  spendMovements: [
    {
      cat: "Comida",
      desc: "Tata: leche",
      act: 100,
    },
  ],
};

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
  incomeMovements: [],
  spendMovements: [],
};

function useAmount() {
  const [initialBalance, setInitialBalance] = useState(
    /** @type {number | undefined} */ (undefined)
  );
  const [amounts, setAmounts] = useState(amountDefault);

  // Cuando se actualiza el initialBalance, el incomeMovements o el spendMovements se calcula el monto total
  useEffect(() => {
    calculateTotalAmount();
  }, [initialBalance, amounts.incomeMovements, amounts.spendMovements]);

  /**
   * Calcula el monto total, sumando los ingresos y restando los gastos
   */
  const calculateTotalAmount = () => {
    const totalIncome = amounts.incomeMovements.reduce((total, movimiento) => {
      return total + movimiento.act;
    }, 0);
    const totalSpend = amounts.spendMovements.reduce((total, movimiento) => {
      return total + movimiento.act;
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
   * @param {Array<movementObject>} incomeMovements
   */
  const updateIncomeMovement = (incomeMovements) => {
    setAmounts({ ...amounts, incomeMovements });
  };

  /**
   * Actualiza los movimientos de gastos y el monto Total
   * @param {Array<movementObject>} spendMovements
   */
  const updateSpendMovement = (spendMovements) => {
    setAmounts({ ...amounts, spendMovements });
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
