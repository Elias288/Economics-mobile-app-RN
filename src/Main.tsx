import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./pages/Home.page";
import { OperationInterface, OperationTypeInterface } from "./intefraces/OperationInterface";
import AppBar from "./components/AppBar";
import CreateOperation from "./pages/CreateOperation.page";

// ****************************** lista de paginas ******************************
export type stackScreens = {
  // [ pagina: parametros ]
  Home: undefined,
  CreateOperation: {
    operation: OperationTypeInterface,
    addNewOperation: (opeartion: OperationInterface) => void
  },
};

// *************************** constructor del stack ***************************
const Stack = createNativeStackNavigator<stackScreens>();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}
          options={{
            headerTitle: (props) => <AppBar {...props} />,
            headerStyle: { backgroundColor: '#294baf' }
          }}
        />
        <Stack.Screen name="CreateOperation" component={CreateOperation}
          options={{
            headerTitle: (props) => <AppBar {...props} />,
            headerStyle: { backgroundColor: '#294baf' }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
