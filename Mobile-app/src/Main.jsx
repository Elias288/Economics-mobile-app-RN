import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'react-native-paper';

import HomeNav from './pages/Home/HomeNav';
import InitialPage from './pages/InitialPage';
import SaveFilePage from './pages/SaveFile/SaveFilePage';

const Stack = createNativeStackNavigator();

const screens = [
  {
    component: HomeNav,
    name: 'homeNav',
    title: 'Home',
    type: 'Nav',
  },
  {
    component: InitialPage,
    name: 'initialPage',
    title: 'Economic application',
    type: 'screen',
  },
  {
    component: SaveFilePage,
    name: 'saveFile',
    title: 'Save File',
    type: 'screen',
  },
];

function Main() {
  const chargeTabScreens = () => {
    return screens.map((item, index) => (
      <Stack.Screen
        key={index}
        name={item.name}
        component={item.component}
        options={{
          title: `${item.title}`,
          headerShown: item.type === 'screen', // si es un nav, mostrara el header de sus hijos
          tabBarIcon: ({ color, size }) => <Icon source={item.icon} color={color} size={size} />,
        }}
      />
    ));
  };

  return <Stack.Navigator initialRouteName="initialPage">{chargeTabScreens()}</Stack.Navigator>;
}

export default Main;
