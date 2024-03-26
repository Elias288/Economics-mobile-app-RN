import { Text, View } from "react-native";
import { Card } from "react-native-paper";
import generalStyles from "../../generalStyles.js";

function ConfigurationScreen({ navigation }) {
  return (
    <View style={generalStyles.container}>
      <Card style={generalStyles.card}>
        <Text>
          Add initial Balance <Text>$0,00</Text>
        </Text>
      </Card>

      <Card style={generalStyles.card}>
        <Text>Spend categories</Text>
      </Card>

      <Card style={generalStyles.card}>
        <Text>Income categories</Text>
      </Card>
    </View>
  );
}

export default ConfigurationScreen;
