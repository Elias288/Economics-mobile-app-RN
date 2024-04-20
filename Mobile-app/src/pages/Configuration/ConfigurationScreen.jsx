import { StyleSheet, Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';

import { generalStyles, getComponentsColors } from '../../generalStyles.js';
import { useAmountContext } from '../../providers/AmountProvider.jsx';
import { useFunctionProvider } from '../../providers/FunctionsProvider.jsx';
import { MOVEMENTTYPE } from '../../providers/MovementsProvider.jsx';

const { button_accept_background, dark_subtitle_color } = getComponentsColors();

function ConfigurationScreen({ navigation }) {
  const { initialBalance } = useAmountContext();
  const { formatAmount } = useFunctionProvider();

  const goToPage = (categoryType) => {
    navigation.navigate('configurationCategoriesPage', {
      categoryType,
    });
  };

  return (
    <View style={generalStyles.container}>
      <Card style={generalStyles.card}>
        <Button
          onPress={() => navigation.navigate('configurationInitialBalance')}
          icon="cash"
          textColor={button_accept_background}
        >
          Add initial Balance <Text>${initialBalance ? formatAmount(initialBalance) : '0,00'}</Text>
        </Button>
      </Card>

      <Text style={styles.subtitle}>Categories:</Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Card style={{ ...generalStyles.card, flex: 1 }}>
          <Button
            onPress={() => goToPage(MOVEMENTTYPE.INCOME)}
            icon="arrow-up-bold"
            textColor={button_accept_background}
          >
            Income
          </Button>
        </Card>

        <Card style={{ ...generalStyles.card, flex: 1 }}>
          <Button
            onPress={() => goToPage(MOVEMENTTYPE.SPEND)}
            icon="arrow-down-bold"
            textColor={button_accept_background}
          >
            Spend
          </Button>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    color: dark_subtitle_color,
    fontWeight: '600',
  },
});

export default ConfigurationScreen;
