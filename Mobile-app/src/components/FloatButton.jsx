import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

/**
 * Botón flotante
 * @param {Object} params
 * @param {() => void} params.onPress Acción al ser pulsado
 * @param {String} [params.icon] Icono, cruz por defecto
 * @param {number} [params.bottom]
 * @param {number} [params.right]
 * @param {number} [params.size]
 * @returns {ReactNode}
 */
const FloatButton = ({ onPress, icon = 'plus', bottom = 10, right = 10, size = 40 }) => {
  return (
    <IconButton
      icon={icon}
      onPress={onPress}
      mode="contained"
      size={size}
      style={{ ...styles.floatButton, bottom, right }}
    />
  );
};

const styles = StyleSheet.create({
  floatButton: {
    position: 'absolute',
  },
});

export default FloatButton;
