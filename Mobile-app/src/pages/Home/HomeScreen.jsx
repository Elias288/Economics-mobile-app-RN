import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Portal } from 'react-native-paper';

import { AmountContainer } from './AmountContainer';
import MovementContainer from './MovementsContainer';
import CustomModal, { customModalStyles } from '../../components/CustomModal';
import FloatButton from '../../components/FloatButton';
import { generalStyles, getColors } from '../../generalStyles';
import { useAmountContext } from '../../providers/AmountProvider';
import { useFilesManagementProvider } from '../../providers/FileManagementProvider';
import { MOVEMENTTYPE } from '../../providers/MovementsProvider';

const color = getColors();

function HomeScreen({ navigation }) {
  const { isOpenedFile, openCSV, cleanData } = useFilesManagementProvider();
  const { totalAmount } = useAmountContext();

  const [showSpinner, setShowSpinner] = useState(false);
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);

  const onOpenClose = async () => {
    setShowSpinner(true);

    if (!isOpenedFile) {
      cleanData();
      await openCSV();
    } else {
      setShowConfirmAlert(true);
    }

    setShowSpinner(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowSpinner(false);
    }, 100);
  }, []);

  return (
    <>
      {showSpinner && (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator animating size="large" />
        </View>
      )}

      <ScrollView>
        <View style={generalStyles.container}>
          <AmountContainer />

          <MovementContainer categoryType={MOVEMENTTYPE.INCOME} />
          <MovementContainer categoryType={MOVEMENTTYPE.SPEND} />
        </View>
      </ScrollView>

      {totalAmount > 0 && (
        <FloatButton
          icon="content-save"
          bottom={70}
          onPress={() => {
            navigation.navigate('saveFile');
          }}
        />
      )}

      <FloatButton icon={isOpenedFile ? 'close-thick' : 'folder-open'} onPress={onOpenClose} />

      <Portal>
        {/* Confirm Clean movement */}
        <CustomModal
          isVisible={showConfirmAlert}
          hideModal={() => setShowConfirmAlert(false)}
          onAccept={() => {
            cleanData();
            setShowConfirmAlert(false);
          }}
          onCancel={() => setShowConfirmAlert(false)}
        >
          <Text style={customModalStyles.modalMessage}>
            Are you sure you want to clean the records?
          </Text>
        </CustomModal>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: color.white,
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;
