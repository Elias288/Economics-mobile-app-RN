import { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Modal, Portal, Button } from "react-native-paper";

/**
 * Modal custom
 * @param {Object} props
 * @param {ReactNode} props.children Contenido del modal
 * @param {boolean} props.isVisible Estado del modal
 * @param {() => void} props.hideModal Función que cierra el modal
 * Optionals
 * @param {StyleProp<ViewStyle>} [props.containerStyle]
 * @param {() => void} [props.onAceptar] Si es definida muestra el botón de aceptar
 * @param {() => void} [props.onCancelar] Si es definida muestra el botón de cancelar
 * @returns {ReactNode}
 */
const CustomModal = (props) => {
  const {
    children,
    containerStyle,
    isVisible,
    hideModal,
    onAceptar,
    onCancelar,
  } = props;

  const acceptHandle = () => {
    if (onAceptar) onAceptar();
  };

  const cancelHandle = () => {
    if (onCancelar) {
      onCancelar();
    }

    hideModal();
  };

  return (
    <Portal>
      <Modal visible={isVisible} onDismiss={hideModal}>
        <View style={[containerStyle, customModalStyles.container]}>
          {children}

          {onAceptar !== undefined && (
            <View style={customModalStyles.actions}>
              <Button onPress={acceptHandle}>Accept</Button>

              {onCancelar !== undefined && (
                <Button onPress={cancelHandle}>Cancel</Button>
              )}
            </View>
          )}
        </View>
      </Modal>
    </Portal>
  );
};

export const customModalStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderTopColor: "#e0e0e0",
    borderTopWidth: 1,
    paddingTop: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalMessage: {
    marginBottom: 20,
  },
});

export default CustomModal;
