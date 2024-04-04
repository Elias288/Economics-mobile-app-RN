import { useState } from 'react';

import '../types/movementType';
import { MOVEMENTTYPE } from './useMovements';

function useTotalAmount(initialBalance = 0) {
  const [totalAmount, setTotalAmount] = useState(initialBalance);

  /**
   * Calcula el monto total, sumando los ingresos y restando los gastos
   * @param {Array<movementObject>} movements
   */
  const calculateTotalAmount = (movements) => {
    const totalIncome = movements
      .filter((movement) => movement.type === MOVEMENTTYPE.INCOME)
      .reduce((total, movimiento) => {
        return total + movimiento.amount;
      }, 0);
    const totalSpend = movements
      .filter((movement) => movement.type === MOVEMENTTYPE.SPEND)
      .reduce((total, movimiento) => {
        return total + movimiento.amount;
      }, 0);

    setTotalAmount(initialBalance + totalIncome - totalSpend);
  };

  return [totalAmount, calculateTotalAmount];
}

export default useTotalAmount;
