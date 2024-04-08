import { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';

import '../types/TableContentType.js';
import { useFunctionProvider } from '../providers/functionsProvider.jsx';

/**
 * Categorías por defecto
 * @type {Array<tableContent>}
 */
const defaultCategories = [
  { cat: 'Category1', fore: 0, act: 0, diff: 0 },
  { cat: 'Category2', fore: 0, act: 0, diff: 0 },
  { cat: 'Category3', fore: 0, act: 0, diff: 0 },
  { cat: 'Category4', fore: 0, act: 0, diff: 0 },
  { cat: 'Category5', fore: 0, act: 0, diff: 0 },
];

const tableHead = [
  { title: 'Category', size: 2 },
  { title: 'Forecast', size: 1 },
  { title: 'Actual', size: 1 },
  { title: 'Difference', size: 1 },
];

/**
 * Amount Table
 * @param {Object} params
 * @param {Array<tableContent>} [params.tableContent] Carga por defecto category[1-5]
 * @returns {ReactNode}
 */
const AmountsTable = ({ tableContent = defaultCategories }) => {
  const { minimizeNumber } = useFunctionProvider();
  const [content, setContent] = useState([]);

  useEffect(() => {
    setContent(tableContent.sort(sortCategories));
  }, [tableContent]);

  const sortCategories = (a, b) => {
    const nameA = a.cat.toUpperCase(); // ignore upper and lowercase
    const nameB = b.cat.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  };

  return (
    <DataTable>
      <DataTable.Header>
        {tableHead.map((item, index) => (
          <DataTable.Title
            key={index}
            style={{ flex: item.size }}
            sortDirection={item.title === 'Category' ? 'descending' : ''}
          >
            {item.title}
          </DataTable.Title>
        ))}
      </DataTable.Header>

      {content.map((item, index) => (
        <DataTable.Row key={index}>
          <DataTable.Cell style={{ flex: tableHead[0].size }}>{item.cat}</DataTable.Cell>
          <DataTable.Cell style={{ flex: tableHead[1].size }}>
            ${minimizeNumber(item.fore)}
          </DataTable.Cell>
          <DataTable.Cell style={{ flex: tableHead[2].size }}>
            ${minimizeNumber(item.act)}
          </DataTable.Cell>
          <DataTable.Cell style={{ flex: tableHead[3].size }}>
            ${minimizeNumber(item.diff)}
          </DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};

export default AmountsTable;
