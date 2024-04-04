import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';

import formatAmount from '../../functions/formatAmount';
import { generalStyles } from '../../generalStyles.js';
import { useAmountContext } from '../../providers/amountProvider.jsx';

/**
 * Componente donde se mostrará el saldo inicial y el saldo disponible agregando y quitando los ingresos y los gastos.
 * @returns {ReactNode}
 */
export const AmountContainer = () => {
  const { initialBalance, totalAmount } = useAmountContext();

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
  },
  totalAmount: {
    fontSize: 40,
  },
  initialBalanceText: {
    textAlign: 'right',
  },
  initialBalance: { fontWeight: 'bold', fontSize: 15 },
});
