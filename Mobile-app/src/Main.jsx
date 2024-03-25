import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

import HomeScreen from "./pages/Home/HomeScreen";

const Stack = createNativeStackNavigator();

function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const generalStyles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginVertical: 5,
    padding: 10,
  },
  textTitle: {
    fontWeight: "bold",
    fontSize: 30,
  },
  textSubtitle: {
    fontWeight: "bold",
    fontSize: 26,
  },
});

export default Main;
export { generalStyles };
