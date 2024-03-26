import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConfigurationScreen from "./ConfigurationScreen";

const Stack = createNativeStackNavigator();

function ConfigurationNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Configuration home" component={ConfigurationScreen} />
    </Stack.Navigator>
  );
}

export default ConfigurationNav;
