import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-paper';

import AmountsTable from '../../components/AmountsTable';
import { generalStyles } from '../../generalStyles';
import { useCategoriesContext } from '../../providers/CategoriesProvider';
import { useMovementsContext } from '../../providers/MovementsProvider';
import { useFunctionProvider } from '../../providers/functionsProvider';

function MovementContainer({ categoryType }) {
  const { movements } = useMovementsContext();
  const { categories } = useCategoriesContext();
  const { capitalizeFirstLetter } = useFunctionProvider();
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
