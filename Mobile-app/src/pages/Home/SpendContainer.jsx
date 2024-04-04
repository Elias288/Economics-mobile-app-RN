import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-paper';

import AmountsTable from '../../components/AmountsTable.jsx';
import { generalStyles } from '../../generalStyles.js';
import { useAmountContext } from '../../providers/amountProvider.jsx';
import '../../types/TableContentType.js';

/**
 * Componente donde visualizar los gastos registrados
 * @returns {ReactNode}
 */
export const SpendContainer = () => {
  const { spendCategories, spendMovements } = useAmountContext();

  const [tableContent, setTableContent] = useState(/** @type {Array<tableContent>} */ ([]));

  useEffect(() => {
    setTableContent(
      spendCategories.map((item) => {
        const cat = item.cat;

        const total = spendMovements.reduce((total, movimiento) => {
          if (movimiento.cat === cat) {
            return total + movimiento.amount;
          }
          return total;
        }, 0);

        return {
          cat: item.cat,
          fore: item.fore,
          act: total,
          diff: 0,
        };
      })
    );
  }, [spendCategories, spendMovements]);

  return (
    <Card style={generalStyles.card}>
      <Text style={generalStyles.textSubtitle}>Spends</Text>

      <AmountsTable tableContent={tableContent} />
    </Card>
  );
};
