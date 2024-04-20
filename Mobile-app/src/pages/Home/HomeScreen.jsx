import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Portal } from 'react-native-paper';

import { AmountContainer } from './AmountContainer';
import MovementContainer from './MovementsContainer';
import CustomModal, { customModalStyles } from '../../components/CustomModal';
import FloatButton from '../../components/FloatButton';
import { generalStyles, getComponentsColors } from '../../generalStyles';
import { useAmountContext } from '../../providers/AmountProvider';
import { useFilesManagementProvider } from '../../providers/FileManagementProvider';
import { MOVEMENTTYPE, useMovementsContext } from '../../providers/MovementsProvider';
import { NOTIFICATION_TYPE, useNotificationProvider } from '../../providers/NotificationProvider';

const {
  background,
  floatingButton_openFile_icon,
  floatingButton_openFile_background,
  floatingButton_saveFile_icon,
  floatingButton_saveFile_background,
  dark_text_color,
} = getComponentsColors();

function HomeScreen({ navigation }) {
  const { isOpenedFile, openCSV, cleanData, chargeData } = useFilesManagementProvider();
  const { totalAmount } = useAmountContext();
  const { movements } = useMovementsContext();
  const { setSnackBarContent, showSnackbar } = useNotificationProvider();

  const [showSpinner, setShowSpinner] = useState(true);
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);

  const onOpenClose = async () => {
    if (!isOpenedFile) {
      setShowSpinner(true); // muestra spinner

      const res = await openCSV(); // carga los datos seleccionados por el usuario

      if (res !== null) {
        cleanData(); // limpia datos cargados
        const data = chargeData(res);

        setSnackBarContent({
          text: data.msg,
          type: data.statusCode === 0 ? NOTIFICATION_TYPE.OK : NOTIFICATION_TYPE.ERROR,
        });
        showSnackbar();
      }
      setShowSpinner(false); // oculta spinner
    } else {
      setShowConfirmAlert(true); // muestra dialogo de confirmación
    }
  };

  const onAccept = () => {
    setShowSpinner(true); // muestra spinner

    cleanData(); // limpia datos cargados
    setShowConfirmAlert(false); // oculta dialogo de confirmación

    setTimeout(() => {
      setShowSpinner(false); // oculta spinner después de 1 segundo
    }, 1000);
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
          <ActivityIndicator animating size={70} color={dark_text_color} />
        </View>
      )}

      <ScrollView>
        <View style={generalStyles.container}>
          <AmountContainer />

          <MovementContainer categoryType={MOVEMENTTYPE.INCOME} />
          <MovementContainer categoryType={MOVEMENTTYPE.SPEND} />
        </View>
      </ScrollView>

      {totalAmount > 0 && movements.length > 0 && (
        <FloatButton
          icon="content-save"
          bottom={70}
          onPress={() => {
            navigation.navigate('saveFile');
          }}
          style={{ backgroundColor: floatingButton_saveFile_background }}
          iconColor={floatingButton_saveFile_icon}
        />
      )}

      <FloatButton
        icon={isOpenedFile ? 'note-remove' : 'note-plus'}
        onPress={onOpenClose}
        style={{ backgroundColor: floatingButton_openFile_background }}
        iconColor={floatingButton_openFile_icon}
      />

      <Portal>
        {/* Confirm Clean movement */}
        <CustomModal
          isVisible={showConfirmAlert}
          hideModal={() => setShowConfirmAlert(false)}
          onAccept={onAccept}
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
    backgroundColor: background,
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;
