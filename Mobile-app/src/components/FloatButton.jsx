import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

import { getComponentsColors } from '../generalStyles';

const { floatingButton_icon, floatingButton_background, floatingButton_border } =
  getComponentsColors();
/**
 * Botón flotante
 * @param {Object} params
 * @param {() => void} params.onPress Acción al ser pulsado
 * @param {String} [params.icon] Icono, cruz por defecto
 * @param {number} [params.bottom]
 * @param {number} [params.right]
 * @param {number} [params.size]
 * @param {import('react-native').ViewStyle} [params.style]
 * @param {string} [params.iconColor]
 * @param {string} [params.mode]
 * @returns {ReactNode}
 */
const FloatButton = (params) => {
  const {
    onPress,
    icon = 'plus-thick',
    bottom = 10,
    right = 10,
    size = 40,
    style,
    iconColor = floatingButton_icon,
    mode = 'outlined',
  } = params;

  return (
    <IconButton
      icon={icon}
      onPress={onPress}
      mode={mode}
      size={size}
      style={{
        ...styles.floatButton,
        ...style,
        bottom,
        right,
      }}
      iconColor={iconColor}
    />
  );
};

const styles = StyleSheet.create({
  floatButton: {
    position: 'absolute',
    backgroundColor: floatingButton_background,
    borderColor: floatingButton_border,
  },
});

export default FloatButton;
