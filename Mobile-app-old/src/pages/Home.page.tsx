import { FlatList, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Button, Modal, PaperProvider, Portal, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import FloatingActionButton from '../components/FloatingActionButton';
import { stackScreens } from '../Main';
import {
  AccountInteface,
  OperationInterface,
  OperationTypeInterface,
} from '../intefraces/AccountInterface';
import { OperationCard } from '../components/OperationCard';
import { event } from '../services/EventEmitter';

type propsType = NativeStackScreenProps<stackScreens, 'Home'>;

const Home = (props: propsType) => {
  const { navigation } = props;
  const [showAddOpeartionModal, setShowAddOpeartionModal] = useState<boolean>(false);
  const [account, setAccount] = useState<AccountInteface>({
    name: 'test account',
    operations: [
      { cause: 'Salario', amount: 24000, operationDate: new Date().toString(), type: 1 },
    ],
    totalAmount: '24000',
  });

  useEffect(() => {
    // *********************** funcion de escucha para crear una operación nueva ***********************
    event.addListener('OnCreateNewOperation', _addNewOperation);

    return () => {
      event.removeListener('OnCreateNewOperation', _addNewOperation);
    };
  }, []);

  const openOperationPage = (operation: OperationInterface) => {
    setShowAddOpeartionModal(false);

    navigation.navigate('OperationPage', {
      operation: operation,
      // createNewOperation: _addNewOperation,
      // deleteOperation: () => {},
      // updatedOperation: _updateOperation,
    });
  };

  const _addNewOperation = (newOperation: OperationInterface) => {
    let newTotalAmount: string = account.totalAmount;
    const operations: Array<OperationInterface> = account.operations;
    operations.push(newOperation);

    if (newOperation.type == OperationTypeInterface.withdraw) {
      // *********************** withdraw money from the total amount ***********************
      newTotalAmount = (+newTotalAmount - newOperation.amount).toString();
    } else {
      // ************************ insert money from the total amount ************************
      newTotalAmount = (+newTotalAmount + newOperation.amount).toString();
    }

    const newAccount: AccountInteface = {
      name: account?.name,
      operations: operations,
      totalAmount: newTotalAmount,
    };

    setAccount(newAccount);
  };

  const _updateOperation = (
    index: number,
    updatedOperation: OperationInterface,
    previousOperation: OperationInterface
  ) => {};

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: '#fff',
            paddingVertical: 50,
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 30 }}>Total Amount:</Text>
          <Text style={{ fontSize: 25 }}>${account.totalAmount}</Text>
        </View>

        {/* ************************* List of account operations ************************* */}
        {account.operations.length === 0 ? (
          <Text style={{ textAlign: 'center' }}>Empty operation list</Text>
        ) : (
          <FlatList
            data={account.operations}
            renderItem={({ item }) => (
              <OperationCard
                operation={item}
                openOperationOptions={() => openOperationPage(item)}
              />
            )}
          />
        )}

        {/* ******* Modal that allows to select which type of operation to create *******  */}
        <Portal>
          <Modal visible={showAddOpeartionModal} onDismiss={() => setShowAddOpeartionModal(false)}>
            <View style={styles.createOperationModalStyle}>
              <Button
                style={styles.createOperationModalButton}
                onPress={() =>
                  openOperationPage({
                    type: OperationTypeInterface.insert,
                    amount: 0,
                    cause: '',
                    operationDate: '',
                  })
                }
              >
                Add new Insert
              </Button>
              <Button
                style={styles.createOperationModalButton}
                onPress={() =>
                  openOperationPage({
                    type: OperationTypeInterface.withdraw,
                    amount: 0,
                    cause: '',
                    operationDate: '',
                  })
                }
              >
                Add new Withdraw
              </Button>
            </View>
          </Modal>
        </Portal>

        {/* ******************************* Floating button ******************************* */}
        <FloatingActionButton
          containerStyles={{ bottom: 15, right: 15 }}
          buttonAction={() => setShowAddOpeartionModal(true)}
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  createOperationModalStyle: {
    marginHorizontal: 10,
    backgroundColor: '#fff',
  },
  createOperationModalButton: {
    padding: 10,
  },
});

export default Home;
