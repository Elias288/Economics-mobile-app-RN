import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, PaperProvider, Snackbar, Text, TextInput } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useCallback, useState } from 'react';
import { DatePickerModal } from 'react-native-paper-dates';

import { stackScreens } from '../Main';
import { OperationInterface } from '../intefraces/AccountInterface';
import { event } from '../services/EventEmitter';

type propsType = NativeStackScreenProps<stackScreens, 'OperationPage'>;

const OperationPage = (props: propsType) => {
  const { navigation, route } = props;
  const { operation /* , createNewOperation, updatedOperation, deleteOperation */ } = route.params;

  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);

  const operationTypeTitle =
    operation.cause === '' ? (operation.type === 0 ? 'a Withdraw' : 'an Insert') : 'Edit Operation';

  const [cause, setCause] = useState<string>(operation.cause != '' ? operation.cause : '');
  const [amount, setAmount] = useState<string>(
    operation.amount != 0 ? operation.amount.toString() : ''
  );
  const [date, setDate] = useState<Date>(
    operation.operationDate != '' ? new Date(operation.operationDate) : new Date()
  );

  const [showSnakcbar, setShowSnakcbar] = useState<boolean>(false);
  const [snakcbarMsg, setSnakcbarMsg] = useState<string>('');

  const onDismissSingle = useCallback(() => {
    setOpenDatePicker(false);
  }, [setOpenDatePicker]);

  const onConfirmSingle = useCallback(
    (params: any) => {
      setOpenDatePicker(false);
      setDate(params.date);
      console.log(params.date);
    },
    [setOpenDatePicker, setDate]
  );

  const handlePress = () => {
    /*
     * Crea una nueva operacion despues de comporbar que el monto no sea vacio o 0
     */
    // ********************** verifica que la causa no esté vacia **********************
    if (cause.trim() === '') {
      setShowSnakcbar(true);
      setSnakcbarMsg('The cause cannot be empty');
      return;
    }

    // ********* verifica que el monto no este vacio, sea un numero y no sea 0 *********
    if (amount.trim() === '' || amount === '0') {
      setShowSnakcbar(true);
      setSnakcbarMsg('Amount cannot be empty or 0');
      return;
    }

    const newOperation: OperationInterface = {
      amount: +amount,
      cause,
      operationDate: date.toString(),
      type: operation.type,
    };

    event.emit('OnCreateNewOperation', newOperation);
    return navigation.goBack();
  };

  return (
    <PaperProvider>
      <Text variant="headlineMedium" style={styles.title}>
        Add {operationTypeTitle}
      </Text>

      {/* ************************************* Cause input ************************************* */}
      <TextInput
        label="Cause"
        value={cause}
        style={styles.inputTet}
        onChangeText={(newValue) => setCause(newValue)}
      />

      {/* ************************************* Amount input ************************************* */}
      <TextInput
        label="Amount"
        value={amount.toString()}
        keyboardType="numeric"
        style={styles.inputTet}
        onChangeText={(newAmount) => setAmount(newAmount)}
      />

      {/* ************************************** DatePicker ************************************** */}
      <Button
        onPress={() => setOpenDatePicker(true)}
        uppercase={false}
        mode="outlined"
        icon="calendar"
      >
        {date.toLocaleDateString()}
      </Button>

      <DatePickerModal
        locale="es"
        mode="single"
        visible={openDatePicker}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
      />

      {/***************************************** Buttons *****************************************/}
      <View style={styles.options}>
        <Button onPress={() => handlePress()} mode="contained">
          Save
        </Button>
        <Button onPress={() => navigation.navigate('Home')} mode="contained">
          Cancel
        </Button>
      </View>

      <Snackbar
        visible={showSnakcbar}
        onDismiss={() => setShowSnakcbar(false)}
        action={{ label: 'close' }}
      >
        {snakcbarMsg}
      </Snackbar>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    paddingVertical: 10,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 20,
  },
  inputTet: {
    marginBottom: 20,
    marginHorizontal: 10,
  },
});

export default OperationPage;
