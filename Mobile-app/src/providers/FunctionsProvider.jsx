import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import { createContext, useContext } from 'react';
import { Platform } from 'react-native';

/**
 * @typedef {Object} functionsProviderProps
 * @property {(amount: number) => string} formatAmount
 * @property {(number: number) => string} minimizeNumber
 * @property {(word: string) => string} capitalizeFirstLetter
 * @property {(date: Date) => Date} removeTimeFromDate
 * @property {(data: movementObject[], totalAmount?: number, initialBalance: number) => string} createSCV
 * @property {(formattedData: string, fileName: string, place?: string) => void} saveCSV
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

  /**
   * Create CSV file
   * @param {movementObject[]} data
   * @returns {string}
   */
  const createSCV = (data, totalAmount, initialBalance = 0) => {
    const amounts = `totalAmount,initialBalance\r\n${totalAmount},${initialBalance}\r\n`;

    const header = Object.keys(data[0]);
    const headerString = header.join(',');
    // handle null or undefined values here
    const replacer = (key, value) => value ?? '';

    const rowItems = data.map((row) =>
      header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(',')
    );
    // join header and body, and break into separate lines
    const csv = amounts + [headerString, ...rowItems].join('\r\n');
    return csv;
  };

  const saveCSV = async (formattedData, fileName, place = 'local') => {
    if (place === 'local') {
      if (Platform.OS === 'android') {
        const permissions =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

        if (permissions.granted) {
          await FileSystem.StorageAccessFramework.createFileAsync(
            permissions.directoryUri,
            fileName,
            'text/csv'
          )
            .then(async (uri) => {
              await FileSystem.writeAsStringAsync(uri, formattedData, {
                encoding: FileSystem.EncodingType.UTF8,
              });
            })
            .catch((e) => console.log(e));
        }
      }
    } else {
      const fileUri = FileSystem.documentDirectory + fileName;
      FileSystem.writeAsStringAsync(fileUri, formattedData, {
        encoding: FileSystem.EncodingType.UTF8,
      }).then(() => {
        shareAsync(fileUri);
      });
    }
  };

  return (
    <FunctionsContext.Provider
      value={{
        formatAmount,
        minimizeNumber,
        capitalizeFirstLetter,
        removeTimeFromDate,
        createSCV,
        saveCSV,
      }}
    >
      {children}
    </FunctionsContext.Provider>
  );
};

export default FunctionsProvider;
