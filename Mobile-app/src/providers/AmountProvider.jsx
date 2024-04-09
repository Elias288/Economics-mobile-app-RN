import { createContext, useContext, useState } from 'react';

import CategoriesProvider from './CategoriesProvider';
import MovementsProvider from './MovementsProvider';
import useTotalAmount from '../hooks/useTotalAmount';

/**
 * @typedef {Object} amountProviderProps
 * @property {number} totalAmount Monto total (+incomeMovements.amount - spendMovements.amount)
 * @property {number} initialBalance
 * @property {(value: number) => void} chargeInitialAmount
 */

/** @type {import('react').Context<amountProviderProps>} */
const CustomContext = createContext(undefined);

export function useAmountContext() {
  const context = useContext(CustomContext);
  if (!context) throw Error('useAmountContext debe estar dentro del AmountProvider');

  return context;
}
const AmountProvider = ({ children }) => {
  const [initialBalance, setInitialBalance] = useState(0);

  const [totalAmount, calculateTotalAmount] = useTotalAmount(initialBalance);

  return (
    <CustomContext.Provider
      value={{
        totalAmount,
        initialBalance,
        chargeInitialAmount: setInitialBalance,
      }}
    >
      <MovementsProvider
        initialBalance={initialBalance}
        calculateTotalAmount={calculateTotalAmount}
      >
        <CategoriesProvider>{children}</CategoriesProvider>
      </MovementsProvider>
    </CustomContext.Provider>
  );
};

export default AmountProvider;
