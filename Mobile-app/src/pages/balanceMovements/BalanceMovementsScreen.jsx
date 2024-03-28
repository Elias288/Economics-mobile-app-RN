import { View } from "react-native";
import { Button, Card } from "react-native-paper";
import generalStyles from "../../generalStyles";

function BalanceMovementsScreen({ navigation }) {
  return (
    <View style={generalStyles.container}>
      <Card style={generalStyles.card}>
        <Button
          icon={"arrow-up-bold"}
          onPress={() => navigation.navigate("Balance Income Movements")}
        >
          Income movements
        </Button>
      </Card>

      <Card style={generalStyles.card}>
        <Button
          icon={"arrow-down-bold"}
          onPress={() => navigation.navigate("Balance Spend Movements")}
        >
          Spend movements
        </Button>
      </Card>
    </View>
  );
}

export default BalanceMovementsScreen;
