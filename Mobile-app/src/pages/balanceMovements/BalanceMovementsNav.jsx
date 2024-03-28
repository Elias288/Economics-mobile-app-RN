import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BalanceMovementsScreen from "./BalanceMovementsScreen";
import BalanceIncomeMovements from "./BalanceIncomeMovements";
import BalanceSpendMovements from "./BalanceSpendMovements";
import AddMovementScreen from "./AddMovementScreen";

const Stack = createNativeStackNavigator();

function BalanceMovementsNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Balance Movement"
        component={BalanceMovementsScreen}
      />
      <Stack.Screen
        name="Balance Income Movements"
        component={BalanceIncomeMovements}
      />
      <Stack.Screen
        name="Balance Spend Movements"
        component={BalanceSpendMovements}
      />
      <Stack.Screen
        name="Add Movement"
        component={AddMovementScreen}
        options={({ route }) => ({
          title: `Add ${route.params.movementType} movement`,
        })}
      />
    </Stack.Navigator>
  );
}

export default BalanceMovementsNav;
