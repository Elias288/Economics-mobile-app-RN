import { Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';

import formatAmount from '../../functions/formatAmount.js';
import { generalStyles } from '../../generalStyles.js';
import { MOVEMENTTYPE } from '../../hooks/useMovements.jsx';
import { useAmountContext } from '../../providers/amountProvider.jsx';

function ConfigurationScreen({ navigation }) {
  const { initialBalance } = useAmountContext();

  const goToPage = (categoryType) => {
    navigation.navigate('configurationCategoriesPage', {
      categoryType,
    });
  };

  return (
    <View style={generalStyles.container}>
      <Card style={generalStyles.card}>
        <Button onPress={() => navigation.navigate('configurationInitialBalance')} icon="cash">
          Add initial Balance <Text>${initialBalance ? formatAmount(initialBalance) : '0,00'}</Text>
        </Button>
      </Card>

      <Card style={generalStyles.card}>
        <Button onPress={() => goToPage(MOVEMENTTYPE.INCOME)} icon="arrow-up-bold">
          Income categories
        </Button>
      </Card>

      <Card style={generalStyles.card}>
        <Button onPress={() => goToPage(MOVEMENTTYPE.SPEND)} icon="arrow-down-bold">
          Spend categories
        </Button>
      </Card>
    </View>
  );
}

export default ConfigurationScreen;
