import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { Icon } from 'react-native-paper';

import { getComponentsColors } from './generalStyles';
import BalanceMovementsNav from './pages/BalanceMovements/BalanceMovementsNav';
import ConfigurationNav from './pages/Configuration/ConfigurationNav';
import HomeNav from './pages/Home/HomeNav';

const { tabBarIcon_color, tabBarIcon_focus_color } = getComponentsColors();

const Tab = createBottomTabNavigator();

const screens = [
  {
    component: HomeNav,
    name: 'Home',
    icon: 'home',
    type: 'nav',
  },
  {
    component: BalanceMovementsNav,
    name: 'Balance Movements',
    icon: 'swap-vertical-bold',
    type: 'nav',
  },
  {
    component: ConfigurationNav,
    name: 'Configurations',
    icon: 'cog',
    type: 'nav',
  },
];

function Main() {
  const chargeTabScreens = () => {
    return screens.map((item, index) => (
      <Tab.Screen
        key={index}
        name={item.name}
        component={item.component}
        options={{
          headerShown: item.type === 'screen',
          tabBarIcon: ({ focused, size }) => (
            <Icon
              source={item.icon}
              color={focused ? tabBarIcon_focus_color : tabBarIcon_color}
              size={size}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ fontSize: 10, color: focused ? tabBarIcon_focus_color : tabBarIcon_color }}
            >
              {item.name}
            </Text>
          ),
        }} // si es un nav, mostrara el header de sus hijos
      />
    ));
  };

  return <Tab.Navigator initialRouteName="homeNav">{chargeTabScreens()}</Tab.Navigator>;
}

export default Main;
