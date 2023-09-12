import { View } from 'react-native';
import { List, PaperProvider, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import { OperationInterface, OperationTypeInterface } from '../intefraces/AccountInterface';

type propsTypes = {
  operation: OperationInterface;
  openOperationOptions: () => void;
};

export const OperationCard = (props: propsTypes) => {
  const { operation, openOperationOptions } = props;

  return (
    <PaperProvider>
      <List.Item
        style={styles.itemStyle}
        title={
          <View style={{}}>
            <Text style={{ fontSize: 25 }}>{operation.cause}</Text>
            <Text>{new Date(operation.operationDate).toLocaleDateString()}</Text>
          </View>
        }
        onPress={openOperationOptions}
        right={() => (
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>
              {operation.type === OperationTypeInterface.withdraw ? '-' : ''}${operation.amount}
            </Text>
          </View>
        )}
      />
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    backgroundColor: '#bbbaba',
    marginBottom: 10,
    marginHorizontal: 5,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
});
