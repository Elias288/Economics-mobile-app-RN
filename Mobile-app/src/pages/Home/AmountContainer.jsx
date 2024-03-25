import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { generalStyles } from "../../Main";
import formatAmount from "../../functions/formatAmount";

/**
 *
 * @param {Object} params
 * @param {number} params.amount Monto total
 * @param {number} params.initialBalance Monto inicial
 * @returns
 */
export const AmountContainer = ({ amount = 0, initialBalance = 0 }) => {
  return (
    <Card style={generalStyles.card}>
      <View style={styles.container}>
        <View style={styles.totalAmountContainer}>
          <Text style={styles.totalAmountTitle}>Total Amount</Text>

          <Text style={styles.totalAmount}>$ {formatAmount(amount)}</Text>
        </View>

        <Text style={styles.initialBalanceText}>
          Initial Balance:{" "}
          <Text style={styles.initialBalance}>
            ${formatAmount(initialBalance)}
          </Text>
        </Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  totalAmountTitle: {
    fontSize: 18,
  },
  totalAmount: {
    fontSize: 40,
  },
  initialBalanceText: {
    textAlign: "right",
  },
  initialBalance: { fontWeight: "bold", fontSize: 15 },
});
