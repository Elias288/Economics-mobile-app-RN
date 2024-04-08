import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-paper';

import HomeScreen from './HomeScreen';
import BalanceMovementsNav from '../BalanceMovements/BalanceMovementsNav';
import ConfigurationNav from '../Configuration/ConfigurationNav';

const Tab = createBottomTabNavigator();

const screens = [
  {
    component: HomeScreen,
    name: 'Home',
    icon: 'home',
    type: 'screen',
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

function HomeNav() {
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
  return <Tab.Navigator initialRouteName="Home">{chargeTabScreens()}</Tab.Navigator>;
}

export default HomeNav;
