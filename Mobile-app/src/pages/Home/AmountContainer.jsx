import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';

import { generalStyles, getComponentsColors } from '../../generalStyles.js';
import { useAmountContext } from '../../providers/AmountProvider.jsx';
import { useFunctionProvider } from '../../providers/FunctionsProvider.jsx';

const { total_amount } = getComponentsColors();
/**
 * Componente donde se mostrará el saldo inicial y el saldo disponible agregando y quitando los ingresos y los gastos.
 * @returns {ReactNode}
 */
export const AmountContainer = () => {
  const { initialBalance, totalAmount } = useAmountContext();
  const { formatAmount } = useFunctionProvider();

  return (
    <Card style={generalStyles.card}>
      <View style={styles.container}>
        <View style={styles.totalAmountContainer}>
          <Text style={styles.totalAmountTitle}>Total Amount</Text>

          <Text style={styles.totalAmount}>$ {formatAmount(totalAmount)}</Text>
        </View>

        {initialBalance !== 0 && (
          <Text style={styles.initialBalanceText}>
            Initial Balance:{' '}
            <Text style={styles.initialBalance}>${formatAmount(initialBalance)}</Text>
          </Text>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
  },
  totalAmountContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalAmountTitle: {
    fontSize: 18,
    color: total_amount,
  },
  totalAmount: {
    fontSize: 40,
    fontWeight: 'bold',
    color: total_amount,
  },
  initialBalanceText: {
    textAlign: 'right',
    color: total_amount,
  },
  initialBalance: { fontWeight: 'bold', fontSize: 15 },
});
