import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./pages/Home.page";
import AppBar from "./components/AppBar";

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: (props) => <AppBar {...props} />,
            headerStyle: { backgroundColor: '#294baf' }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;