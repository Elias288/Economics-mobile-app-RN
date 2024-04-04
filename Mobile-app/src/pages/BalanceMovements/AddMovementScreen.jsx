import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { Button, Card, TextInput } from 'react-native-paper';

import { colors, generalStyles } from '../../generalStyles';
import { useAmountContext } from '../../providers/amountProvider';
import '../../types/movementType';

function AddMovementScreen({ route, navigation }) {
  const { movementType } = route.params;
  const { categories, addMovement } = useAmountContext();

  const descriptionInput = useRef(null);
  const [newMovement, setNewMovement] = useState({
    date: new Date(),
    cat: '',
    desc: '',
    amount: 0,
    type: movementType,
  });
  const [categoryByType, setCategoryByType] = useState([]);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  useEffect(() => {
    setCategoryByType(
      categories.filter((cat) => cat.type === movementType).map((category) => category.cat)
    );
  }, [categories, movementType]);

  const addNewMovement = () => {
    if (newMovement.amount <= 0) return alert('Invalid Amount');
    if (newMovement.desc.trim() === '') return alert('Invalid Description');
    if (newMovement.cat.trim() === '') return alert('Invalid Category');

    addMovement(newMovement, movementType);

    navigation.goBack();
  };

  const setNewDate = (evt, selectedDate) => {
    setNewMovement({ ...newMovement, date: selectedDate });
    setShowDateTimePicker(false);
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
            boxStyles={{ backgroundColor: colors.white }}
            setSelected={(select) => {
              setNewMovement({ ...newMovement, cat: select });
            }}
          />

          <Button mode="contained" onPress={() => setShowDateTimePicker(true)}>
            {newMovement.date.toLocaleDateString()}
          </Button>
          {showDateTimePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={newMovement.date}
              mode="date"
              is24Hour
              onChange={setNewDate}
            />
          )}

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
