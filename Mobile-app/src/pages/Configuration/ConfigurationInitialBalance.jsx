import { useState, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';

import { generalStyles } from '../../generalStyles';
import { useAmountContext } from '../../providers/AmountProvider';
import { useFunctionProvider } from '../../providers/FunctionsProvider';

function ConfigurationInitialBalance() {
  const { initialBalance, chargeInitialAmount } = useAmountContext();
  const { formatAmount } = useFunctionProvider();

  const balanceInput = useRef(null);
  const [initialBalanceValue, setInitialBalanceValue] = useState(
    /** @type {string | undefined} */ (initialBalance ? initialBalance.toString() : undefined)
  );

  const chargeBalance = () => {
    if (!initialBalanceValue) return alert('Ingrese un monto valido');

    chargeInitialAmount(Number.parseFloat(initialBalanceValue));
    balanceInput.current.blur();
  };

  return (
    <View style={generalStyles.container}>
      <Card style={generalStyles.card}>
        <View style={styles.initialBalanceContainer}>
          <Text style={generalStyles.textTitle}>Initial Balance: </Text>
          <Text style={styles.initialBalance}>
            {initialBalance ? formatAmount(initialBalance) : '0,00'}
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.formInputText}
            ref={balanceInput}
            autoFocus
            label="$0.00"
            value={initialBalanceValue}
            keyboardType="numeric"
            onChangeText={(text) => setInitialBalanceValue(text)}
          />
          <Button style={styles.formButton} onPress={() => chargeBalance()}>
            Add
          </Button>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  initialBalanceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 10,
    borderBottomColor: '#bbbbbb',
    borderBottomWidth: 1,
  },
  initialBalance: {
    fontSize: 40,
  },
  form: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 10,
  },
  formInputText: {
    flex: 1,
  },
  formButton: {
    justifyContent: 'center',
  },
});

export default ConfigurationInitialBalance;
