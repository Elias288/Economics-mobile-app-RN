import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-paper';

import BalanceMovementsNav from './pages/BalanceMovements/BalanceMovementsNav';
import ConfigurationNav from './pages/Configuration/ConfigurationNav';
import HomeNav from './pages/Home/HomeNav';

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
          tabBarIcon: ({ color, size }) => <Icon source={item.icon} color={color} size={size} />,
        }} // si es un nav, mostrara el header de sus hijos
      />
    ));
  };

  return <Tab.Navigator initialRouteName="homeNav">{chargeTabScreens()}</Tab.Navigator>;
}

export default Main;
