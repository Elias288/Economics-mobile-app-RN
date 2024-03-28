import { StyleSheet, Text, View } from "react-native";
import generalStyles from "../../generalStyles";
import { Button, Card, TextInput } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import { useAmountContext } from "../../providers/amountProvider";
import { useEffect, useState, useRef } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import "../../types/movementType";

function AddMovementScreen({ route, navigation }) {
  const { movementType } = route.params;
  const {
    incomeCategories,
    spendCategories,
    updateIncomeMovement,
    updateSpendMovement,
  } = useAmountContext();

  const descriptionInput = useRef(null);
  const [categories, setCategories] = useState([]);
  const [newMovement, setNewMovement] = useState(
    /** @type {movementObject} */ ({
      date: new Date(),
      cat: "",
      desc: "",
      amount: 0,
    })
  );

  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  useEffect(() => {
    if (movementType === "spend") {
      setCategories(spendCategories.map((category) => category.cat));
    } else {
      setCategories(incomeCategories.map((category) => category.cat));
    }
  }, []);

  const addNewMovement = () => {
    if (movementType === "spend") {
      updateSpendMovement(newMovement);
    } else {
      updateIncomeMovement(newMovement);
    }

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
            label={"Amount: $0.00"}
            autoFocus={true}
            keyboardType="numeric"
            onChangeText={(text) =>
              setNewMovement({ ...newMovement, amount: Number.parseInt(text) })
            }
            onSubmitEditing={() => {
              descriptionInput.current.focus(); // focus al siguiente TextInput
            }}
          />

          <TextInput
            label={"Description"}
            ref={descriptionInput}
            onChangeText={(text) =>
              setNewMovement({ ...newMovement, desc: text })
            }
          />

          <SelectList
            data={categories}
            search={false}
            boxStyles={{ backgroundColor: "#fff" }}
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
              is24Hour={true}
              onChange={setNewDate}
            />
          )}

          <Button onPress={addNewMovement} mode="contained">
            Add
          </Button>
        </View>
      </Card>
      <Text>{JSON.stringify(newMovement, null, 4)}</Text>
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
