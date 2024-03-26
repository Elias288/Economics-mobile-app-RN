import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-paper";

import HomeScreen from "./pages/Home/HomeScreen";
import ConfigurationNav from "./pages/Configuration/ConfigurationNav";

const Tab = createBottomTabNavigator();

const screens = [
  {
    component: HomeScreen,
    name: "Home",
    icon: "home",
    type: "screen",
  },
  {
    component: ConfigurationNav,
    name: "ConfigurationNav",
    icon: "cog",
    type: "nav",
  },
];
function Main() {
  const chargeTabScreens = () => {
    return screens.map((item, index) => {
      if (item.type === "nav") {
        return (
          <Tab.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Icon source={item.icon} color={color} size={size} />
              ),
            }}
          />
        );
      }

      return (
        <Tab.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon source={item.icon} color={color} size={size} />
            ),
          }}
        />
      );
    });
  };

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        {chargeTabScreens()}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Main;
