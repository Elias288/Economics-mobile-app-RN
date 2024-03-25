import { ScrollView, StyleSheet, View } from "react-native";
import { AmountContainer } from "./AmountContainer";
import { GastosContainer } from "./GastosContainer";
import { IngresosContainer } from "./IngresosContainer";

function HomeScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <AmountContainer />

        <GastosContainer />

        <IngresosContainer />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 100,
  },
});

export default HomeScreen;
