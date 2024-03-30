import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BalanceMovementsScreen from "./BalanceMovementsScreen";
import AddMovementScreen from "./AddMovementScreen";
import BalanceMovementsPage from "./BalanceMovementsPage";

const Stack = createNativeStackNavigator();

function BalanceMovementsNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Balance Movement"
        component={BalanceMovementsScreen}
      />

      <Stack.Screen
        name="View Balance Movements"
        component={BalanceMovementsPage}
        options={({ route }) => ({
          title: `Balance ${route.params.movementType} movements`,
        })}
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
