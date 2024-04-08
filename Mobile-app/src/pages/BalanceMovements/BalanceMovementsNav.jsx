import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddMovementScreen from './AddMovementScreen';
import BalanceMovementsPage from './BalanceMovementsPage';
import BalanceMovementsScreen from './BalanceMovementsScreen';

const Stack = createNativeStackNavigator();

function BalanceMovementsNav({ navigation }) {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="balanceMovement"
          component={BalanceMovementsScreen}
          options={{ title: 'Balance Movements' }}
        />

        <Stack.Screen
          name="viewBalanceMovements"
          component={BalanceMovementsPage}
          options={({ route }) => ({
            title: `Balance ${route.params.movementType} movements`,
          })}
        />

        <Stack.Screen
          name="addMovement"
          component={AddMovementScreen}
          options={({ route }) => ({
            title: `Add ${route.params.movementType} movement`,
          })}
        />
      </Stack.Navigator>
    </>
  );
}

export default BalanceMovementsNav;
