import { useState } from "react";

function useTotalAmount(initialBalance = 0) {
  const [totalAmount, setTotalAmount] = useState(initialBalance);

  /** Calcula el monto total, sumando los ingresos y restando los gastos */
  const calculateTotalAmount = (incomeMovements, spendMovements) => {
    const totalIncome = incomeMovements.reduce((total, movimiento) => {
      return total + movimiento.amount;
    }, 0);
    const totalSpend = spendMovements.reduce((total, movimiento) => {
      return total + movimiento.amount;
    }, 0);

    setTotalAmount(initialBalance + totalIncome - totalSpend);
  };

  return [totalAmount, calculateTotalAmount];
}

export default useTotalAmount;
