import { StyleSheet, Text, View } from "react-native";
import { Card, Icon } from "react-native-paper";
import generalStyles from "../../generalStyles";
import FloatButton from "../../components/FloatButton";
import { useAmountContext } from "../../providers/amountProvider";
import { BalanceTable } from "../../components/BalanceTable";

function BalanceIncomeMovements({ navigation }) {
  const { incomeMovements } = useAmountContext();

  return (
    <>
      <View style={generalStyles.container}>
        <Card style={generalStyles.card}>
          <View style={styles.titleContainer}>
            <Icon source={"arrow-up-bold"} color={colors.black} size={30} />

            <Text style={generalStyles.textTitle}>
              Balance Income Movements
            </Text>
          </View>

          <BalanceTable movements={incomeMovements} />
        </Card>
      </View>

      <FloatButton
        action={() =>
          navigation.navigate("Add Movement", {
            movementType: "income",
          })
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomColor: "#bbbbbb",
    borderBottomWidth: 2,
    paddingBottom: 20,
    marginBottom: 20,
  },
});

export default BalanceIncomeMovements;
