import { createContext, useContext, useEffect } from 'react';

import useMovements from '../hooks/useMovements';

/**
 * @typedef {Object} movementProviderProps
 * @property {Array<movementObject>} movements
 * @property {(newMovement: Partial<movementObject>) => void} addMovement
 * @property {(movementId: string) => void} deleteMovement
 * @property {(oldCategory: string, newCategory: string) => void} changeCategory
 */

/** @type {import('react').Context<movementProviderProps>} */
export const MovementsContext = createContext(undefined);

export function useMovementsContext() {
  const context = useContext(MovementsContext);
  if (!context) throw Error('useAmountContext debe estar dentro del MovementsProvider');
  return context;
}

const MovementsProvider = ({ children, initialBalance, calculateTotalAmount }) => {
  const { movements, changeCategory, addMovement, deleteMovement } = useMovements();

  useEffect(() => {
    calculateTotalAmount(movements);
  }, [initialBalance, movements, calculateTotalAmount]);

  return (
    <MovementsContext.Provider value={{ movements, addMovement, deleteMovement, changeCategory }}>
      {children}
    </MovementsContext.Provider>
  );
};

export default MovementsProvider;
