import { createContext, useContext } from 'react';

/**
 * @typedef {Object} functionsProviderProps
 * @property {(amount: number) => string} formatAmount
 * @property {(number: number) => string} minimizeNumber
 * @property {(word: string) => string} capitalizeFirstLetter
 * @property {(date: Date) => Date} removeTimeFromDate
 */

/** @type {import('react').Context<functionsProviderProps>} */
const FunctionsContext = createContext(undefined);

export const useFunctionProvider = () => {
  const context = useContext(FunctionsContext);
  if (!context) throw new Error('useFunctionProvider debe estar dentro de un FunctionsProvider');

  return context;
};

const FunctionsProvider = ({ children }) => {
  /**
   * Formatea valores
   * @param {number} amount Monto a ser formatead a 00.000,00
   * @returns {string}
   */
  const formatAmount = (amount) => {
    if (amount === 0 || amount === undefined) return '0,00';

    // Verificar si el número es entero
    if (amount % 1 === 0) {
      return amount.toLocaleString('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    return amount.toLocaleString('es-ES', { minimumFractionDigits: 2 });
  };

  /**
   * Minimiza números
   * @param {number} number
   * @returns {string}
   */
  const minimizeNumber = (number) => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(number);
  };

  /**
   * Capitalize first letter
   * @param {string} word
   * @returns {string}
   */
  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  /**
   * Remove time from date
   * @param {Date} date
   * @returns {Date}
   */
  const removeTimeFromDate = (date) => {
    const newDate = date;
    newDate.setHours(0);
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    return newDate;
  };

  return (
    <FunctionsContext.Provider
      value={{
        formatAmount,
        minimizeNumber,
        capitalizeFirstLetter,
        removeTimeFromDate,
      }}
    >
      {children}
    </FunctionsContext.Provider>
  );
};

export default FunctionsProvider;
