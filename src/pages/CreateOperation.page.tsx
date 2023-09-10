import { Button, PaperProvider, Snackbar, Text, TextInput } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DatePickerModal } from 'react-native-paper-dates';
import { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { OperationInterface } from '../intefraces/OperationInterface';
import { stackScreens } from '../Main';

type propsType = NativeStackScreenProps<stackScreens, 'CreateOperation'>;

const CreateOperation = (props: propsType) => {
  const { navigation, route } = props;
  const { operation, addNewOperation } = route.params;

  const [cause, setCause] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  const [showSnakcbar, setShowSnakcbar] = useState<boolean>(false);
  const [snakcbarMsg, setSnakcbarMsg] = useState<string>('');

  const operationType = operation === 0 ? 'a Withdraw' : 'an Insert';

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
      operationDate: date,
      type: operation,
    };

    addNewOperation(newOperation);
    navigation.navigate('Home');
  };

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

  return (
    <PaperProvider>
      <Text variant="headlineMedium" style={styles.title}>
        Add {operationType}
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
      <Button onPress={() => setOpenDatePicker(true)} uppercase={false} mode="outlined">
        Pick single date
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

export default CreateOperation;
