import { useState, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import generalStyles from "../../generalStyles";
import formatAmount from "../../functions/formatAmount";

function ConfigurationInitialBalance() {
  const balanceInput = useRef(null);
  const [initialBalance, setInitialBalance] = useState(
    /** @type {string} */ ("")
  );
  const [formattedInitialBalance, setFormattedInitialBalance] = useState(
    /** @type {string | undefined} */ (undefined)
  );

  const chargeBalance = () => {
    if (!initialBalance) return alert("Ingrese un monto valido");

    const formatted = formatAmount(Number.parseFloat(initialBalance));
    setFormattedInitialBalance(formatted);
    balanceInput.current.blur();
  };

  return (
    <View style={generalStyles.container}>
      <Card style={generalStyles.card}>
        <View style={styles.initialBalanceContainer}>
          <Text style={generalStyles.textTitle}>Initial Balance: </Text>
          <Text style={styles.initialBalance}>
            ${formattedInitialBalance ? formattedInitialBalance : "0,00"}
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.formInputText}
            ref={balanceInput}
            autoFocus={true}
            label={"$0.00"}
            value={initialBalance}
            keyboardType="numeric"
            onChangeText={(text) => setInitialBalance(text)}
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
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    marginBottom: 10,
    borderBottomColor: "#bbbbbb",
    borderBottomWidth: 1,
  },
  initialBalance: {
    fontSize: 40,
  },
  form: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 10,
  },
  formInputText: {
    flex: 1,
  },
  formButton: {
    justifyContent: "center",
  },
});

export default ConfigurationInitialBalance;
