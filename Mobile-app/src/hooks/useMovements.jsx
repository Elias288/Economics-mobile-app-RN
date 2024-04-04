import * as Crypto from 'expo-crypto';
import { useState } from 'react';
import '../types/movementType';
import '../types/categoriesType';

export const MOVEMENTTYPE = {
  INCOME: 'income',
  SPEND: 'spend',
};

function useMovements() {
  const [movements, setMovements] = useState(/** @type {movementObject[]} */ ([]));

  /**
   * Agrega un movimiento de ingreso o gasto
   * @param {Partial<movementObject>} newMovement Objeto de movimiento
   * @returns void
   */
  const addMovement = (newMovement) => {
    const movementToAdd = { ...newMovement, Id: Crypto.randomUUID() };
    setMovements([...movements, movementToAdd]);
  };

  /**
   * Elimina movimiento
   * @param {string} movementId
   */
  const deleteMovement = (movementId) => {
    setMovements(movements.filter((movement) => movement.Id !== movementId));
  };

  /**
   * Change category
   * @param {string} oldCategory
   * @param {string} newCategory
   */
  const changeCategory = (oldCategory, newCategory) => {
    setMovements(
      movements.map((movement) =>
        movement.cat === oldCategory ? { ...movement, cat: newCategory } : movement
      )
    );
  };

  return {
    movements,
    addMovement,
    deleteMovement,
    changeCategory,
  };
}

export default useMovements;
