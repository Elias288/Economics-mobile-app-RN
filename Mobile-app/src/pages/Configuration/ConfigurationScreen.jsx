import { Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';

import formatAmount from '../../functions/formatAmount.js';
import { generalStyles } from '../../generalStyles.js';
import { useAmountContext } from '../../providers/amountProvider.jsx';

function ConfigurationScreen({ navigation }) {
  const { initialBalance } = useAmountContext();

  return (
    <View style={generalStyles.container}>
      <Card style={generalStyles.card}>
        <Button onPress={() => navigation.navigate('Configuration Initial Balance')} icon="cash">
          Add initial Balance <Text>${initialBalance ? formatAmount(initialBalance) : '0,00'}</Text>
        </Button>
      </Card>

      <Card style={generalStyles.card}>
        <Button
          onPress={() => navigation.navigate('Configuration income categories')}
          icon="arrow-up-bold"
        >
          Income categories
        </Button>
      </Card>

      <Card style={generalStyles.card}>
        <Button
          onPress={() => navigation.navigate('Configuration spend categories')}
          icon="arrow-down-bold"
        >
          Spend categories
        </Button>
      </Card>
    </View>
  );
}

export default ConfigurationScreen;
