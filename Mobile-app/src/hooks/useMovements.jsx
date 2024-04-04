import { useState } from 'react';
import '../types/movementType';
import '../types/categoriesType';

export const MOVEMENTTYPE = {
  INCOME: 'income',
  SPEND: 'spend',
};

function useMovements() {
  const [incomeMovements, setIncomeMovements] = useState(/** @type {Array<movementObject>} */ ([]));
  const [spendMovements, setSpendMovements] = useState(/** @type {Array<movementObject>} */ ([]));

  /**
   * Agrega un movimiento de ingreso o gasto
   * @param {movementObject} newMovement Objeto de movimiento
   * @param {string} type Tipo: income o spend
   * @returns void
   */
  const addMovement = (newMovement, type) => {
    if (type === MOVEMENTTYPE.INCOME) {
      setIncomeMovements([...incomeMovements, newMovement]);
    }

    if (type === MOVEMENTTYPE.SPEND) {
      setSpendMovements([...spendMovements, newMovement]);
    }
  };

  /**
   * Elimina movimiento
   * @param {movementObject} movementToDelete movimiento a ser eliminado
   * @param {string} type Tipo: income o spend
   */
  const deleteMovement = (movementToDelete, type) => {
    if (type === MOVEMENTTYPE.INCOME) {
      const newMovements = incomeMovements.filter((movement) => movement !== movementToDelete);
      setIncomeMovements(newMovements);
    }

    if (type === MOVEMENTTYPE.SPEND) {
      const newMovements = spendMovements.filter((movement) => movement !== movementToDelete);
      setSpendMovements(newMovements);
    }
  };

  /**
   * Get movement bt category
   * @param {string} type
   * @param {movementObject} categoryToFind
   * @returns {void}
   */
  const getMovementByCategory = (type, categoryToFind) => {
    if (type === MOVEMENTTYPE.INCOME) {
      return incomeMovements.filter((category) => category.cat === categoryToFind);
    }

    if (type === MOVEMENTTYPE.SPEND) {
      return spendMovements.filter((category) => category.cat === categoryToFind);
    }

    return [];
  };

  /**
   * Change category
   * @param {categoryObject} oldCategory
   * @param {string} type
   * @param {categoryObject} newCategory
   */
  const changeCategory = (oldCategory, type, newCategory) => {
    if (type === MOVEMENTTYPE.INCOME) {
      setIncomeMovements(
        incomeMovements.map((movement) =>
          movement.cat === oldCategory ? { ...movement, cat: newCategory } : movement
        )
      );
    }

    if (type === MOVEMENTTYPE.SPEND) {
      setSpendMovements(
        spendMovements.map((movement) =>
          movement.cat === oldCategory ? { ...movement, cat: newCategory } : movement
        )
      );
    }
  };

  return {
    incomeMovements,
    spendMovements,
    addMovement,
    deleteMovement,
    getMovementByCategory,
    changeCategory,
  };
}

export default useMovements;
