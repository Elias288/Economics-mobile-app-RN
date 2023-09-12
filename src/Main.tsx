import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './pages/Home.page';
import { OperationInterface, OperationTypeInterface } from './intefraces/AccountInterface';
import AppBar from './components/AppBar';
import CreateOperation from './pages/CreateOperation.page';
import OperationPage from './pages/Operation.page';

// ****************************** lista de paginas ******************************
export type stackScreens = {
  // [ pagina: parametros ]
  Home: undefined;
  CreateOperation: {
    operationType: OperationTypeInterface;
    addNewOperation: (opeartion: OperationInterface) => void;
  };
  OperationPage: {
    operation: OperationInterface;
    // createNewOperation: (newOperation: OperationInterface) => void;
    // updatedOperation: (
    //   indes: number,
    //   updatedOperation: OperationInterface,
    //   previouseOperation: OperationInterface
    // ) => void;
    // deleteOperation: (indexOperation: number) => void;
  };
};

// *************************** constructor del stack ***************************
const Stack = createNativeStackNavigator<stackScreens>();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: (props) => <AppBar {...props} />,
            headerStyle: { backgroundColor: '#294baf' },
            statusBarStyle: 'auto',
          }}
        />
        <Stack.Screen
          name="CreateOperation"
          component={CreateOperation}
          options={{
            headerTitle: (props) => <AppBar {...props} />,
            headerStyle: { backgroundColor: '#294baf' },
            statusBarStyle: 'auto',
          }}
        />
        <Stack.Screen
          name="OperationPage"
          component={OperationPage}
          options={{
            headerTitle: (props) => <AppBar {...props} />,
            headerStyle: { backgroundColor: '#294baf' },
            statusBarStyle: 'auto',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
