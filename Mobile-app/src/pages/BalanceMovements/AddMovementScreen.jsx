import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { randomUUID } from 'expo-crypto';
import { useEffect, useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { Button, Card, TextInput } from 'react-native-paper';

import { generalStyles, getColors, getComponentsColors } from '../../generalStyles';
import '../../types/movementType';
import { useCategoriesContext } from '../../providers/CategoriesProvider';
import { useMovementsContext } from '../../providers/MovementsProvider';
import { NOTIFICATION_TYPE, useNotificationProvider } from '../../providers/NotificationProvider';

const { button_accept_background, button_date_background, input_background } =
  getComponentsColors();

function AddMovementScreen({ route, navigation }) {
  const { movementType } = route.params;
  const { categories } = useCategoriesContext();
  const { movementsDispatch } = useMovementsContext();
  const { setSnackBarContent, showSnackbar } = useNotificationProvider();

  const amountInput = useRef(null);
  const [newMovement, setNewMovement] = useState({
    Id: '',
    date: new Date(),
    cat: '',
    desc: '',
    amount: 0,
    type: movementType,
  });
  const [categoryByType, setCategoryByType] = useState([]);

  useEffect(() => {
    setCategoryByType(
      categories.filter((cat) => cat.type === movementType).map((category) => category.cat)
    );
  }, [categories, movementType]);

  const addNewMovement = () => {
    if (newMovement.amount <= 0) return alert('Invalid Amount');
    if (newMovement.desc.trim() === '') return alert('Invalid Description');
    if (newMovement.cat.trim() === '') return alert('Invalid Category');

    newMovement.Id = randomUUID();
    movementsDispatch({ type: 'add_movement', newMovement });

    setSnackBarContent({ text: 'Correctly added movement', type: NOTIFICATION_TYPE.OK });
    showSnackbar();
    navigation.goBack();
  };

  const setNewDate = (evt, selectedDate) => {
    setNewMovement({ ...newMovement, date: selectedDate });
  };

  const showDateTimePicker = () => {
    DateTimePickerAndroid.open({
      testID: 'dateTimePicker',
      value: newMovement.date,
      mode: 'date',
      is24Hour: true,
      onChange: setNewDate,
    });
  };

  return (
    <View style={generalStyles.container}>
      <Card style={generalStyles.card}>
        <View style={styles.form}>
          {/* Description */}
          <TextInput
            label="Description"
            autoFocus
            onChangeText={(text) => setNewMovement({ ...newMovement, desc: text })}
            style={{ backgroundColor: input_background }}
            onSubmitEditing={() => {
              amountInput.current.focus(); // focus al siguiente TextInput
            }}
          />

          {/* Amount */}
          <TextInput
            ref={amountInput}
            label="Amount: $0.00"
            keyboardType="numeric"
            onChangeText={(text) =>
              setNewMovement({ ...newMovement, amount: Number.parseFloat(text) })
            }
            style={{ backgroundColor: input_background }}
          />

          {/* Category */}
          <SelectList
            data={categoryByType}
            search={false}
            boxStyles={{ backgroundColor: getColors().white }}
            setSelected={(select) => {
              setNewMovement({ ...newMovement, cat: select });
            }}
          />

          {/* Date */}
          <Button
            mode="contained"
            onPress={showDateTimePicker}
            style={{ backgroundColor: button_date_background }}
          >
            {newMovement.date.toLocaleDateString()}
          </Button>

          {/* Action */}
          <Button
            onPress={addNewMovement}
            mode="contained"
            style={{ backgroundColor: button_accept_background }}
          >
            Add
          </Button>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 20,
    padding: 10,
  },
});

export default AddMovementScreen;
