import { StyleSheet } from 'react-native';

const getColors = () => {
  return {
    black: '#1d1d1d',
    white: '#fff',
    red: '#ac1212',

    lightGray: '#bbbbbb',
    gray: '#7e7e7e',

    purple: '#6b4faa',
    lightPurple: '#8360d0',

    orange: '#f46524',
    lightOrange: '#fcece6',
    darkOrange: '#c53929',

    blue: '#0068b3',
    darkBlue: '#334960',
  };
};

const colors = getColors();

const getComponentsColors = () => {
  return {
    background: colors.white,

    dark_text_color: colors.darkBlue,
    light_text_color: colors.white,

    subtitle_color: colors.lightGray,
    dark_subtitle_color: colors.gray,
    border_color: colors.lightGray,

    // Tab bar button
    tabBarIcon_color: colors.lightGray,
    tabBarIcon_focus_color: colors.orange,

    snackbar_ok_color: colors.darkBlue,
    snackbar_error_color: colors.red,

    // Open File button
    floatingButton_openFile_icon: colors.darkBlue,
    floatingButton_openFile_background: colors.lightOrange,

    // Save File button
    floatingButton_saveFile_icon: colors.orange,
    floatingButton_saveFile_background: colors.lightOrange,
    button_saveFile_background: colors.darkBlue,
    fileName_container_background: colors.lightOrange,

    // Add floating button
    floatingButton_icon: colors.orange,
    floatingButton_background: colors.white,
    floatingButton_border: colors.lightGray,

    // Income floating button
    floatingButton_income_icon: colors.white,
    floatingButton_income_background: colors.gray,

    // Spend floating button
    floatingButton_spend_icon: colors.white,
    floatingButton_spend_background: colors.gray,

    // Movements
    total_amount: colors.darkBlue,
    movement_container_title: colors.orange,

    // Chips
    amounts_chip_background: colors.lightGray,
    amount_text_color: colors.white,

    category_chip_background: colors.lightOrange,
    category_chip_text_color: colors.darkBlue,

    // Inputs
    input_background: colors.lightOrange,
    button_accept_background: colors.darkBlue,
    button_cancel_background: colors.darkOrange,

    button_date_background: colors.blue,
  };
};

const generalStyles = StyleSheet.create({
  card: {
    backgroundColor: getColors().white,
    marginVertical: 5,
    padding: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 100,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    color: colors.darkBlue,
  },
  textSubtitle: {
    fontWeight: 'bold',
    fontSize: 26,
    color: colors.darkBlue,
  },
});

export { generalStyles, getColors, getComponentsColors };
