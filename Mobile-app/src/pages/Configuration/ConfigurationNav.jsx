import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConfigurationScreen from "./ConfigurationScreen";
import ConfigurationInitialBalance from "./ConfigurationInitialBalance";

const Stack = createNativeStackNavigator();

function ConfigurationNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Configuration home" component={ConfigurationScreen} />
      <Stack.Screen
        name="Configuration Initial Balance"
        component={ConfigurationInitialBalance}
      />
    </Stack.Navigator>
  );
}

export default ConfigurationNav;
