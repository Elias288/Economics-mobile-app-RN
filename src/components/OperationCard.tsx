import { View } from "react-native";
import { PaperProvider, Text } from "react-native-paper";
import { StyleSheet } from 'react-native'

import { OperationInterface, OperationTypeInterface } from "../intefraces/OperationInterface";

export const OperationCard = ({ operation }: { operation: OperationInterface; }) => {
  return (
    <PaperProvider>
      <View style={styles.container}>

        <View style={styles.cardInfo}>
          <Text style={{ fontSize: 25 }}>{operation.cause}</Text>
          <Text>{operation.operationDate.toLocaleDateString()}</Text>
        </View>
        <Text style={{ fontSize: 20 }}>{operation.type === OperationTypeInterface.withdraw ? '-' : ""}${operation.amount}</Text>

      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#bbbaba',
    marginBottom: 10,
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  cardInfo: {
  },
});
