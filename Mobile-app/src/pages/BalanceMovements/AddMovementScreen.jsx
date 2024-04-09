import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useEffect, useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { Button, Card, TextInput } from 'react-native-paper';

import { generalStyles, getColors } from '../../generalStyles';
import '../../types/movementType';
import { useCategoriesContext } from '../../providers/CategoriesProvider';
import { useMovementsContext } from '../../providers/MovementsProvider';

function AddMovementScreen({ route, navigation }) {
  const { movementType } = route.params;
  const { categories } = useCategoriesContext();
  const { movementsDispatch } = useMovementsContext();

  const descriptionInput = useRef(null);
  const [newMovement, setNewMovement] = useState({
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

    movementsDispatch({ type: 'add_movement', newMovement });

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
          <TextInput
            label="Amount: $0.00"
            autoFocus
            keyboardType="numeric"
            onChangeText={(text) =>
              setNewMovement({ ...newMovement, amount: Number.parseFloat(text) })
            }
            onSubmitEditing={() => {
              descriptionInput.current.focus(); // focus al siguiente TextInput
            }}
          />

          <TextInput
            label="Description"
            ref={descriptionInput}
            onChangeText={(text) => setNewMovement({ ...newMovement, desc: text })}
          />

          <SelectList
            data={categoryByType}
            search={false}
            boxStyles={{ backgroundColor: getColors().white }}
            setSelected={(select) => {
              setNewMovement({ ...newMovement, cat: select });
            }}
          />

          <Button mode="contained" onPress={showDateTimePicker}>
            {newMovement.date.toLocaleDateString()}
          </Button>

          <Button onPress={addNewMovement} mode="contained">
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
