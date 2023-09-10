import { FlatList, StyleSheet, View } from "react-native";
import { useState } from "react";
import { Button, Modal, PaperProvider, Portal, Text } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import FloatingActionButton from "../components/FloatingActionButton";
import { stackScreens } from "../Main";
import { OperationInterface, OperationTypeInterface } from "../intefraces/OperationInterface";
import { OperationCard } from "../components/OperationCard";

type propsType = NativeStackScreenProps<stackScreens, "Home">

const Home = (props: propsType) => {
  const { navigation } = props;
  const [visibleModal, setVisibleModal] = useState(false);

  const [totalAmount, setTotalAmount] = useState<string>("0");
  const [operationList, setOperationList] = useState<Array<OperationInterface>>([]);

  const openCreateOperation = (operation: OperationTypeInterface) => {
    setVisibleModal(false);
    navigation.navigate('CreateOperation', { operation, addNewOperation: _addNewOperation });
  };

  const _addNewOperation = (opeartion: OperationInterface) => {
    setOperationList(oldArrat => [...oldArrat, opeartion]);
    if (opeartion.type == OperationTypeInterface.withdraw) {
      // *********************** withdraw money from the total amount ***********************
      setTotalAmount((+totalAmount - opeartion.amount).toString());
    } else {
      // ************************ insert money from the total amount ************************
      setTotalAmount((+totalAmount + opeartion.amount).toString());
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={{
          backgroundColor: '#fff',
          paddingVertical: 50,
          alignItems: 'center',
          marginBottom: 10
        }}>
          <Text style={{ fontSize: 30, }}>Total Amount:</Text>
          <Text style={{ fontSize: 25, }}>${totalAmount}</Text>
        </View>

        {/* ************************* List of account operations ************************* */}
        {
          operationList.length === 0
            ? <Text style={{ textAlign: 'center' }}>Empty operation list</Text>
            : <FlatList
              data={operationList}
              renderItem={({ item }) => <OperationCard operation={item} />}
            />
        }

        {/* ******* Modal that allows to select which type of operation to create *******  */}
        <Portal>
          <Modal visible={visibleModal} onDismiss={() => setVisibleModal(false)}>
            <View style={styles.modalView}>
              <Button
                style={styles.modalButton}
                onPress={() => openCreateOperation(OperationTypeInterface.insert)}
              >
                Add new Insert
              </Button>
              <Button
                style={styles.modalButton}
                onPress={() => openCreateOperation(OperationTypeInterface.withdraw)}
              >
                Add new Withdraw
              </Button>
            </View>
          </Modal>
        </Portal>

        {/* ******************************* Floating button ******************************* */}
        <FloatingActionButton
          containerStyles={{ bottom: 15, right: 15 }}
          buttonAction={() => setVisibleModal(true)}
        />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  modalView: {
    marginHorizontal: 10,
    backgroundColor: '#fff',
  },
  modalButton: {
    padding: 10,
  },
});

export default Home;
