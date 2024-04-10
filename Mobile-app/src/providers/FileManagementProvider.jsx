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
   * @returns {void}
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

  /** Open CSV   */
  const openCSV = async () => {
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (permissions.granted) {
      try {
        const document = await DocumentPicker.getDocumentAsync({
          type: ['text/comma-separated-values', 'text/csv'],
        });

        const dataCSV = await FileSystem.readAsStringAsync(document.assets[0].uri, {
          encoding: FileSystem.EncodingType.UTF8,
        });

        return chargeData(stringCSVToJson(dataCSV));
      } catch (e) {
        console.log(e);
        return null;
      }
    }

    return null;
  };

  /**
   * String CSV to JSON
   * @param {string} data
   * @returns {amountObject}
   */
  const stringCSVToJson = (data) => {
    const lines = data.trim().split('\n');
    /** @type {amountObject} */
    const dataJson = {};

    // HEADERS DATA
    const headerValue = lines[1]
      .trim()
      .split(',')
      .map((value) => parseInt(value, 10));
    dataJson.totalAmount = headerValue[0];
    dataJson.initialBalance = headerValue[1];

    // MOVEMENTS
    const movementsKey = lines[2].trim().split(',');
    /** @type {movementObject[]} */
    const movements = [];

    for (let i = 3; i < lines.length; i++) {
      const values = lines[i].split(',');

      const movement = {};
      for (let j = 0; j < values.length; j++) {
        if (movementsKey[j] === 'amount') {
          movement[movementsKey[j]] = parseInt(values[j], 10); // parse to int the value
        } else if (movementsKey[j] === 'date') {
          movement[movementsKey[j]] = new Date(values[j].replace(/"/g, '').replace(/\r/g, ''));
        } else {
          movement[movementsKey[j]] = values[j].replace(/"/g, '').replace(/\r/g, ''); // else charge value
        }
      }
      movements.push(movement);
    }
    dataJson.movements = movements;

    return dataJson;
  };

  const chargeData = (data) => {
    chargeInitialAmount(Number.parseFloat(data.initialBalance));

    data.movements.forEach((movement) => {
      movementsDispatch({ type: 'add_movement', newMovement: movement });
    });

    setIsOpenedFile(true);
  };

  const cleanData = () => {
    chargeInitialAmount(0);
    movementsDispatch({ type: 'clean_movements' });
    setIsOpenedFile(false);
  };

  return (
    <FilesManagementContext.Provider
      value={{ isOpenedFile, createSCV, saveCSV, openCSV, cleanData }}
    >
      {children}
    </FilesManagementContext.Provider>
  );
}

export default FilesManagementProvider;
