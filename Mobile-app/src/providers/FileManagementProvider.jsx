import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import { createContext, useContext, useState } from 'react';
import { Platform } from 'react-native';

import { useAmountContext } from './AmountProvider';
import { useMovementsContext } from './MovementsProvider';

/**
 * @typedef {Object} amountObject
 * @property {number} totalAmount
 * @property {number} initialBalance
 * @property {movementObject[]} movements
 */

/**
 * @typedef {Object} FilesManagementProviderProps
 * @property {boolean} isOpenedFile
 * @property {(data: movementObject[], totalAmount: number, initialBalance?: number) => string} createSCV
 * @property {(formattedData: string, fileName: string, place?: string) => Promise<void>} saveCSV
 * @property {() => Promise<string | null>} openCSV
 * @property {()=> void} cleanData
 * @property {(data: string)=> responseType} chargeData
 */

/** @type {import('react').Context<FilesManagementProviderProps>} */
const FilesManagementContext = createContext(undefined);

export const useFilesManagementProvider = () => {
  const context = useContext(FilesManagementContext);
  if (!context)
    throw new Error('useFunctionProvider debe estar dentro de un FilesManagementProvider');

  return context;
};

function FilesManagementProvider({ children }) {
  const { chargeInitialAmount } = useAmountContext();
  const { movementsDispatch } = useMovementsContext();

  const [isOpenedFile, setIsOpenedFile] = useState(false);

  /**
   * Create CSV file
   * @param {movementObject[]} data
   * @param {number} totalAmount
   * @param {number} [totalAmount]
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

  /**
   * Save CSV
   * @param {string} formattedData
   * @param {string} fileName
   * @param {string} [place]
   * @returns {Promise<void>}
   */
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

              setIsOpenedFile(true);
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

  /**
   * Open CSV
   * @return {Promise<string | null>}
   */
  const openCSV = async () => {
    try {
      const document = await DocumentPicker.getDocumentAsync({
        type: ['text/comma-separated-values', 'text/csv'],
      });

      const dataCSV = await FileSystem.readAsStringAsync(document.assets[0].uri, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      return dataCSV;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  /**
   * String CSV to JSON
   * @param {string} data
   * @returns {responseType}
   */
  const stringCSVToJson = (data) => {
    try {
      const lines = data.trim().split('\n');
      /** @type {amountObject} */
      const dataJson = {};

      // Valida el largo del archivo
      if (lines.length < 3) throw new Error('Error when trying to open file\nInvalid file length');

      const headerData = ['totalAmount', 'initialBalance'];
      const movementsHeaderData = ['Id', 'amount', 'cat', 'date', 'desc', 'type'];

      const headerKeys = lines[0].trim().split(',');

      // Valida las cabeceras
      if (!headerKeys.every((item) => headerData.includes(item)))
        throw new Error('Error when trying to open file\nInvalid headers');

      const movementsKey = lines[2].trim().split(',');
      // Valida las cabeceras de los movimientos
      if (!movementsKey.every((item) => movementsHeaderData.includes(item)))
        throw new Error('Error when trying to open file\nInvalid movements headers');

      // HEADERS DATA
      const headerValue = lines[1]
        .trim()
        .split(',')
        .map((value) => {
          const val = parseInt(value, 10);
          if (isNaN(val)) throw new Error('Error trying to open file\nInvalid data.');
          return val;
        });

      dataJson.totalAmount = headerValue[0];
      dataJson.initialBalance = headerValue[1];

      // MOVEMENTS
      /** @type {movementObject[]} */
      const movements = [];

      for (let i = 3; i < lines.length; i++) {
        const values = lines[i].split(',');

        const movement = {};
        for (let j = 0; j < values.length; j++) {
          const data = values[j].replace(/"/g, '').replace(/\r/g, '');

          if (movementsKey[j] === 'amount') {
            const amount = parseInt(data, 10);
            if (isNaN(amount)) throw new Error('Error trying to open file\nInvalid amount data');
            movement[movementsKey[j]] = amount; // parse to int the value
          } else if (movementsKey[j] === 'date') {
            const date = new Date(data);
            if (!(date instanceof Date))
              throw new Error('Error trying to open file\nInvalid date data');

            movement[movementsKey[j]] = date;
          } else {
            movement[movementsKey[j]] = data; // else charge value
          }
        }
        movements.push(movement);
      }
      dataJson.movements = movements;

      return { statusCode: 0, data: dataJson, msg: 'File uploaded successfully' };
    } catch (error) {
      return { statusCode: -1, msg: error.message };
    }
  };

  /**
   * Charge Data
   * @param {string} data
   * @returns {responseType}
   */
  const chargeData = (data) => {
    const csvData = stringCSVToJson(data);

    // Si no hay error carga los datos
    if (csvData.statusCode === 0) {
      chargeInitialAmount(Number.parseFloat(csvData.data.initialBalance));
      csvData.data.movements.forEach((movement) => {
        movementsDispatch({ type: 'add_movement', newMovement: movement });
      });

      setIsOpenedFile(true);
    }

    return { ...csvData };
  };

  const cleanData = () => {
    chargeInitialAmount(0);
    movementsDispatch({ type: 'clean_movements' });
    setIsOpenedFile(false);
  };

  return (
    <FilesManagementContext.Provider
      value={{ isOpenedFile, createSCV, saveCSV, openCSV, cleanData, chargeData }}
    >
      {children}
    </FilesManagementContext.Provider>
  );
}

export default FilesManagementProvider;
