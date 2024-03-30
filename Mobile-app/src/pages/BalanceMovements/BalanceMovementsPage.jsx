import { StyleSheet, Text, View } from "react-native";
import FloatButton from "../../components/FloatButton";
import { Card, Icon } from "react-native-paper";
import { colors, generalStyles } from "../../generalStyles";
import { BalanceTable } from "../../components/BalanceTable";
import { useState, useEffect } from "react";
import { useAmountContext } from "../../providers/amountProvider";

const BalanceMovementsPage = ({ route, navigation }) => {
  const { spendMovements, incomeMovements } = useAmountContext();
  const { movementType } = route.params;
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    if (movementType === "income") {
      setMovements(incomeMovements);
    } else {
      setMovements(spendMovements);
    }
  }, [spendMovements, incomeMovements]);

  return (
    <>
      <View style={generalStyles.container}>
        <Card style={generalStyles.card}>
          <View style={styles.titleContainer}>
            {movementType === "income" ? (
              <Icon source={"arrow-up-bold"} color={colors.black} size={30} />
            ) : (
              <Icon source={"arrow-down-bold"} color={colors.black} size={30} />
            )}

            <Text style={{ ...generalStyles.textTitle, flex: 1 }}>
              Balance {movementType} movements
            </Text>
          </View>

          <BalanceTable movements={movements} />
        </Card>
      </View>

      <FloatButton
        action={() => navigation.navigate("Add Movement", { movementType })}
      />
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 2,
    paddingBottom: 20,
    marginBottom: 20,
  },
});

export default BalanceMovementsPage;
