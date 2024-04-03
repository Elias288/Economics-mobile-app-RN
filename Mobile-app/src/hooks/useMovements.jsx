import { useState } from "react";

export const MOVEMENTTYPE = {
  INCOME: "income",
  SPEND: "spend",
};

function useMovements() {
  const [incomeMovements, setIncomeMovements] = useState([
    /* {
      date: new Date(),
      amount: 1500,
      desc: "Test",
      cat: "Sueldo",
    }, */
  ]);
  const [spendMovements, setSpendMovements] = useState([]);

  /**
   * Agrega un movimiento de ingreso o gasto
   * @param {movementObject} newMovement Objeto de movimiento
   * @param {string} type Tipo: income o spend
   * @returns void
   */
  const addMovement = (newMovement, type) => {
    console.log("addMovement");
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
      const newMovements = incomeMovements.filter(
        (movement) => movement !== movementToDelete
      );
      setIncomeMovements(newMovements);
    }

    if (type === MOVEMENTTYPE.SPEND) {
      const newMovements = spendMovements.filter(
        (movement) => movement !== movementToDelete
      );
      setSpendMovements(newMovements);
    }
  };

  const getMovementByCategory = (type, categoryToFind) => {
    if (type === MOVEMENTTYPE.INCOME) {
      return incomeMovements.filter(
        (category) => category.cat === categoryToFind
      );
    }

    if (type === MOVEMENTTYPE.SPEND) {
      return spendMovements.filter(
        (category) => category.cat === categoryToFind
      );
    }

    return [];
  };

  const changeCategory = (oldCategory, type, newCategory) => {
    if (type === MOVEMENTTYPE.INCOME) {
      setIncomeMovements(
        incomeMovements.map((movement) =>
          movement.cat === oldCategory
            ? { ...movement, cat: newCategory }
            : movement
        )
      );
    }

    if (type === MOVEMENTTYPE.SPEND) {
      setSpendMovements(
        spendMovements.map((movement) =>
          movement.cat === oldCategory
            ? { ...movement, cat: newCategory }
            : movement
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
