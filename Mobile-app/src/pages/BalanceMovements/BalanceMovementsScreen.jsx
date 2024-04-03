import { View } from "react-native";
import { Button, Card } from "react-native-paper";
import { generalStyles } from "../../generalStyles";
import { MOVEMENTTYPE } from "../../services/balanceService";

function BalanceMovementsScreen({ navigation }) {
  const goToPage = (movementType) => {
    navigation.navigate("View Balance Movements", {
      movementType,
    });
  };

  return (
    <View style={generalStyles.container}>
      <Card style={generalStyles.card}>
        <Button
          icon={"arrow-up-bold"}
          onPress={() => {
            goToPage(MOVEMENTTYPE.INCOME);
          }}
        >
          Income movement new
        </Button>
      </Card>

      <Card style={generalStyles.card}>
        <Button
          icon={"arrow-down-bold"}
          onPress={() => {
            goToPage(MOVEMENTTYPE.SPEND);
          }}
        >
          Spend movement new
        </Button>
      </Card>
    </View>
  );
}

export default BalanceMovementsScreen;
