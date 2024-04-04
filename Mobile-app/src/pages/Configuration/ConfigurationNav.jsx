import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ConfigurationCategoriesPage from './ConfigurationCategoriesPage';
import ConfigurationInitialBalance from './ConfigurationInitialBalance';
import ConfigurationScreen from './ConfigurationScreen';

const Stack = createNativeStackNavigator();

function ConfigurationNav() {
  return (
    <Stack.Navigator initialRouteName="configuration">
      <Stack.Screen
        name="configuration"
        component={ConfigurationScreen}
        options={{ title: 'Configuration' }}
      />

      <Stack.Screen
        name="configurationInitialBalance"
        component={ConfigurationInitialBalance}
        options={{ title: 'Configuration Initial Balance' }}
      />

      <Stack.Screen
        name="configurationCategoriesPage"
        component={ConfigurationCategoriesPage}
        options={({ route }) => ({ title: `Add ${route.params.categoryType} Category` })}
      />
    </Stack.Navigator>
  );
}

export default ConfigurationNav;
