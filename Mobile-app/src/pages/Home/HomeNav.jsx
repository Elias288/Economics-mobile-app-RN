import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import SaveFilePage from '../SaveFile/SaveFilePage';

const Stack = createNativeStackNavigator();

const screens = [
  {
    component: HomeScreen,
    name: 'home',
    title: 'Home',
    type: 'screen',
  },
  {
    component: SaveFilePage,
    name: 'saveFile',
    title: 'Save File',
    type: 'screen',
  },
];

function HomeNav() {
  const chargeTabScreens = () => {
    return screens.map((item, index) => (
      <Stack.Screen
        key={index}
        name={item.name}
        component={item.component}
        options={{
          title: `${item.title}`,
          headerShown: item.type === 'screen', // si es un nav, mostrara el header de sus hijos
        }}
      />
    ));
  };
  return <Stack.Navigator initialRouteName="Home">{chargeTabScreens()}</Stack.Navigator>;
}

export default HomeNav;
