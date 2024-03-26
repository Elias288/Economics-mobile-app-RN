import { Text, View } from "react-native";
import { Button, Card } from "react-native-paper";
import generalStyles from "../../generalStyles.js";

function ConfigurationScreen({ navigation }) {
  return (
    <View style={generalStyles.container}>
      <Card style={generalStyles.card}>
        <Button
          onPress={() => navigation.navigate("Configuration Initial Balance")}
          icon={"cash"}
        >
          Add initial Balance <Text>$0,00</Text>
        </Button>
      </Card>

      <Card style={generalStyles.card}>
        <Button
          onPress={() => navigation.navigate("Configuration income categories")}
          icon={"arrow-up-bold"}
        >
          Income categories
        </Button>
      </Card>

      <Card style={generalStyles.card}>
        <Button
          onPress={() => navigation.navigate("Configuration spend categories")}
          icon={"arrow-down-bold"}
        >
          Spend categories
        </Button>
      </Card>
    </View>
  );
}

export default ConfigurationScreen;
