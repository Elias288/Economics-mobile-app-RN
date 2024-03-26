import { ReactNode } from "react";
import { IconButton } from "react-native-paper";
import { StyleSheet } from "react-native";

/**
 * Botón flotante
 * @param {Object} params
 * @param {() => void} params.action Acción al ser pulsado
 * @param {String} [params.icon] Icono, cruz por defecto
 * @returns {ReactNode}
 */
const FloatButton = ({ action, icon = "plus" }) => {
  return (
    <IconButton
      style={styles.floatButton}
      icon={icon}
      onPress={action}
      mode="contained"
      size={40}
    />
  );
};

const styles = StyleSheet.create({
  floatButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});

export default FloatButton;
