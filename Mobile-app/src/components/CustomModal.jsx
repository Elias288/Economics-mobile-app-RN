import { StyleSheet, View } from 'react-native';
import { Modal, Button } from 'react-native-paper';

import { getComponentsColors } from '../generalStyles';

const { button_accept_background, button_cancel_background } = getComponentsColors();

/**
 * Modal custom
 * @param {Object} props
 * @param {ReactNode} props.children Contenido del modal
 * @param {boolean} props.isVisible Estado del modal
 * @param {() => void} props.hideModal Función que cierra el modal
 * Optionals
 * @param {StyleProp<ViewStyle>} [props.containerStyle]
 * @param {() => void} [props.onAccept] Si es definida muestra el botón de aceptar
 * @param {() => void} [props.onCancel] Si es definida muestra el botón de cancelar
 * @returns {ReactNode}
 */
const CustomModal = (props) => {
  const { children, containerStyle, isVisible, hideModal, onAccept, onCancel } = props;

  const acceptHandle = () => {
    if (onAccept) onAccept();
  };

  const cancelHandle = () => {
    if (onCancel) {
      onCancel();
    }

    hideModal();
  };

  return (
    <Modal visible={isVisible} onDismiss={hideModal}>
      <View style={[containerStyle, customModalStyles.container]}>
        {children}

        {onAccept !== undefined && (
          <View style={customModalStyles.actions}>
            <Button onPress={acceptHandle} textColor={button_accept_background}>
              Accept
            </Button>

            {onCancel !== undefined && (
              <Button onPress={cancelHandle} textColor={button_cancel_background}>
                Cancel
              </Button>
            )}
          </View>
        )}
      </View>
    </Modal>
  );
};

export const customModalStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopColor: '#e0e0e0',
    borderTopWidth: 1,
    paddingTop: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalMessage: {
    marginBottom: 20,
  },
});

export default CustomModal;
