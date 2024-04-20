import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';

import { getComponentsColors } from '../../generalStyles';
import { useFunctionProvider } from '../../providers/FunctionsProvider';
import { MOVEMENTTYPE } from '../../providers/MovementsProvider';
import '../../types/movementType';

const { text_color: table_text } = getComponentsColors();

/**
 * Movements table
 * @param {Object} params
 * @param {movementObject[]} params.data
 * @returns
 */
const MovementsTable = ({ data }) => {
  const { formatAmount } = useFunctionProvider();
  const [page, setPage] = useState(0);
  const [itemsPerPage] = useState(8);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title style={{ flex: 2 }} textStyle={{ color: table_text }}>
          Description
        </DataTable.Title>
        <DataTable.Title style={{ flex: 1 }} textStyle={{ color: table_text }}>
          Category
        </DataTable.Title>
        <DataTable.Title style={{ flex: 1 }} textStyle={{ color: table_text }}>
          Amount
        </DataTable.Title>
      </DataTable.Header>

      {data.slice(from, to).map((movement) => (
        <DataTable.Row key={movement.Id}>
          {/* Description */}
          <DataTable.Cell style={{ flex: 2 }}>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: table_text }}>
                {movement.desc}
              </Text>
              <Text>{movement.date.toLocaleDateString()}</Text>
            </View>
          </DataTable.Cell>

          {/* Category */}
          <DataTable.Cell style={{ flex: 1 }} textStyle={{ color: table_text }}>
            {movement.cat}
          </DataTable.Cell>

          {/* Amount */}
          <DataTable.Cell style={{ flex: 1 }} textStyle={{ color: table_text }}>
            {movement.type === MOVEMENTTYPE.SPEND ? `-` : ' '}${formatAmount(movement.amount)}
          </DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(data.length / itemsPerPage)}
        label={`${from + 1}-${to} of ${data.length}`}
        numberOfItemsPerPageList={10}
        numberOfItemsPerPage={itemsPerPage}
        showFastPaginationControls
        selectPageDropdownLabel="Rows per page"
        onPageChange={(page) => setPage(page)}
      />
    </DataTable>
  );
};

export default MovementsTable;
