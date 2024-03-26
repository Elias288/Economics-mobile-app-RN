import { ScrollView, View } from "react-native";
import { AmountContainer } from "./AmountContainer";
import { GastosContainer } from "./GastosContainer";
import { IngresosContainer } from "./IngresosContainer";
import generalStyles from "../../generalStyles";

function HomeScreen() {
  return (
    <ScrollView>
      <View style={generalStyles.container}>
        <AmountContainer />

        <GastosContainer />

        <IngresosContainer />
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
