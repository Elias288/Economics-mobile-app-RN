import { DataTable } from "react-native-paper";
import minimizeNumber from "../functions/minimizeNumber";

/**
 *
 * @param {Object} params
 * @param {Array<movementObject>} params.movements
 * @returns {ReactNode}
 */
export const BalanceTable = ({ movements }) => {
  const tableHead = [
    { title: "Date", size: 1 },
    { title: "Amount", size: 1 },
    { title: "Description", size: 2 },
    { title: "Category", size: 1 },
  ];

  return (
    <DataTable style={{ marginBottom: 20 }}>
      <DataTable.Header>
        {tableHead.map((item, index) => (
          <DataTable.Title key={index} style={{ flex: item.size }}>
            {item.title}
          </DataTable.Title>
        ))}
      </DataTable.Header>

      {movements.map((item, index) => (
        <DataTable.Row key={index}>
          <DataTable.Cell style={{ flex: tableHead[0].size }}>
            {item.date.toLocaleString()}
          </DataTable.Cell>
          <DataTable.Cell style={{ flex: tableHead[1].size }}>
            {item.amount ? `$${minimizeNumber(item.amount)}` : ""}
          </DataTable.Cell>
          <DataTable.Cell style={{ flex: tableHead[2].size }}>
            {item.desc}
          </DataTable.Cell>
          <DataTable.Cell style={{ flex: tableHead[3].size }}>
            {item.cat}
          </DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};
