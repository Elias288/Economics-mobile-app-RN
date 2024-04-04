import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-paper';

import AmountsTable from '../../components/AmountsTable';
import capitalizeFirstLetter from '../../functions/capitalizeFirstLetter';
import { generalStyles } from '../../generalStyles';
import { useAmountContext } from '../../providers/amountProvider';

function MovementContainer({ categoryType }) {
  const { categories, movements } = useAmountContext();
  const [tableContent, setTableContent] = useState(/** @type {Array<tableContent>} */ ([]));

  useEffect(() => {
    const categoriesByType = categories.filter((cat) => cat.type === categoryType);
    const movementsByType = movements.filter((movement) => movement.type === categoryType);

    setTableContent(
      categoriesByType.map((item) => {
        const cat = item.cat;
        const total = movementsByType.reduce((total, movimiento) => {
          if (movimiento.cat === cat) return total + movimiento.amount;
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
  }, [categoryType, categories, movements]);

  return (
    <Card style={generalStyles.card}>
      <Text style={generalStyles.textSubtitle}>{capitalizeFirstLetter(categoryType)}</Text>

      <AmountsTable tableContent={tableContent} />
    </Card>
  );
}

export default MovementContainer;
