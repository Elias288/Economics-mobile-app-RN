import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConfigurationScreen from "./ConfigurationScreen";
import ConfigurationInitialBalance from "./ConfigurationInitialBalance";
import ConfigurationIncomeCategories from "./ConfigurationIncomeCategories";
import ConfigurationSpendCategories from "./ConfigurationSpendCategories";

const Stack = createNativeStackNavigator();

function ConfigurationNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Configuration" component={ConfigurationScreen} />
      <Stack.Screen
        name="Configuration Initial Balance"
        component={ConfigurationInitialBalance}
      />
      <Stack.Screen
        name="Configuration income categories"
        component={ConfigurationIncomeCategories}
      />
      <Stack.Screen
        name="Configuration spend categories"
        component={ConfigurationSpendCategories}
      />
    </Stack.Navigator>
  );
}

export default ConfigurationNav;
