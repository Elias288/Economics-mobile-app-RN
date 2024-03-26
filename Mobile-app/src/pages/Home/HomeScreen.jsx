import { ScrollView, View } from "react-native";
import { AmountContainer } from "./AmountContainer";
import { SpendContainer } from "./SpendContainer";
import { IncomeContainer } from "./IncomeContainer";
import generalStyles from "../../generalStyles";

function HomeScreen() {
  return (
    <ScrollView>
      <View style={generalStyles.container}>
        <AmountContainer />

        <SpendContainer />

        <IncomeContainer />
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
