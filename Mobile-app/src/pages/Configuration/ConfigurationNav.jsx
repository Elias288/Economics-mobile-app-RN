import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ConfigurationIncomeCategories from './ConfigurationIncomeCategories';
import ConfigurationInitialBalance from './ConfigurationInitialBalance';
import ConfigurationScreen from './ConfigurationScreen';
import ConfigurationSpendCategories from './ConfigurationSpendCategories';

const Stack = createNativeStackNavigator();

function ConfigurationNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Configuration" component={ConfigurationScreen} />
      <Stack.Screen name="Configuration Initial Balance" component={ConfigurationInitialBalance} />
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
