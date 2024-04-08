import { randomUUID } from 'expo-crypto';
import { createContext, useContext, useEffect, useReducer } from 'react';

/**
 * @typedef {Object} movementProviderProps
 * @property {Array<movementObject>} movements
 * @property {React.DispatchWithoutAction} dispatch
 */

/** @type {import('react').Context<movementProviderProps>} */
export const MovementsContext = createContext(undefined);

export const MOVEMENTTYPE = {
  INCOME: 'income',
  SPEND: 'spend',
};

export function useMovementsContext() {
  const context = useContext(MovementsContext);
  if (!context) throw Error('useAmountContext debe estar dentro del MovementsProvider');
  return context;
}

const MovementsProvider = ({ children, initialBalance, calculateTotalAmount }) => {
  const [movements, dispatch] = useReducer((state = [], action) => {
    switch (action.type) {
      case 'add_movement': {
        return [...state, { Id: randomUUID(), ...action.newMovement }];
      }
      case 'remove_movement': {
        return state.filter((movement) => movement.Id !== action.movementIdToDelete);
      }
      case 'update_category': {
        return state.map((movement) =>
          movement.cat === action.oldCategory ? { ...movement, cat: action.newCategory } : movement
        );
      }
      default: {
        return state;
      }
    }
  }, []);

  useEffect(() => {
    calculateTotalAmount(movements);
  }, [initialBalance, movements, calculateTotalAmount]);

  return (
    <MovementsContext.Provider value={{ movements, movementsDispatch: dispatch }}>
      {children}
    </MovementsContext.Provider>
  );
};

export default MovementsProvider;
