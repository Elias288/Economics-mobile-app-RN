import { useState, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';

import { generalStyles, getComponentsColors } from '../../generalStyles';
import { useAmountContext } from '../../providers/AmountProvider';
import { useFunctionProvider } from '../../providers/FunctionsProvider';
import { NOTIFICATION_TYPE, useNotificationProvider } from '../../providers/NotificationProvider';

const {
  button_accept_background,
  input_background,
  light_text_color,
  border_color,
  dark_text_color,
} = getComponentsColors();

function ConfigurationInitialBalance({ navigation }) {
  const { initialBalance, chargeInitialAmount } = useAmountContext();
  const { formatAmount } = useFunctionProvider();
  const { setSnackBarContent, showSnackbar } = useNotificationProvider();

  const add_button = useRef(null);
  const [initialBalanceValue, setInitialBalanceValue] = useState(
    /** @type {string | undefined} */ (initialBalance ? initialBalance.toString() : undefined)
  );

  const chargeBalance = () => {
    const initialNumber =
      initialBalanceValue || !isNaN(Number.parseFloat(initialBalanceValue))
        ? Number.parseFloat(initialBalanceValue)
        : 0;

    chargeInitialAmount(initialNumber);

    setSnackBarContent({
      text: 'Initial amount has been updated',
      type: NOTIFICATION_TYPE.OK,
    });
    showSnackbar();
    navigation.goBack();
  };

  return (
    <View style={generalStyles.container}>
      <Card style={{ ...generalStyles.card, paddingVertical: 20 }}>
        <View style={styles.initialBalanceContainer}>
          <Text style={generalStyles.textTitle}>Initial Balance: </Text>
          <Text style={styles.initialBalance}>
            {initialBalance ? formatAmount(initialBalance) : '0,00'}
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.formInputText}
            autoFocus
            label="$0.00"
            value={initialBalanceValue}
            keyboardType="numeric"
            onChangeText={(text) => setInitialBalanceValue(text)}
            onSubmitEditing={chargeBalance}
          />

          <Button
            style={styles.formButton}
            ref={add_button}
            onPress={() => chargeBalance()}
            textColor={light_text_color}
          >
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
    paddingVertical: 20,
    marginBottom: 10,
    borderBottomColor: border_color,
    borderBottomWidth: 1,
  },
  initialBalance: {
    fontSize: 40,
    color: dark_text_color,
  },
  form: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 10,
  },
  formInputText: {
    flex: 1,
    backgroundColor: input_background,
  },
  formButton: {
    backgroundColor: button_accept_background,
    borderRadius: 15,
    justifyContent: 'center',
  },
});

export default ConfigurationInitialBalance;
