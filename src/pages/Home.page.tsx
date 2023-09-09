import { StyleSheet, Text, View } from "react-native";
import FloatingActionButton from "../components/FloatingActionButton";
import { useState } from "react";
import { Button, Modal, PaperProvider, Portal } from "react-native-paper";

const Home = () => {
    const [visibleModal, setVisibleModal] = useState(false);

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Text>Home</Text>
                
                <Portal>
                    <Modal visible={visibleModal} onDismiss={() => setVisibleModal(false)}>
                        <View style={styles.modalView}>
                            <Button
                                style={styles.modalButton}
                                onPress={() => { }}
                            >
                                Add new Insert
                            </Button>
                            <Button
                                style={styles.modalButton}
                                onPress={() => { }}
                            >
                                Add new Withdraw
                            </Button>
                        </View>
                    </Modal>
                </Portal>

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
        backgroundColor: '#b8b8b8',
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