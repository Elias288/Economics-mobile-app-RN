import { StyleSheet } from 'react-native';

const getColors = () => {
  return {
    black: '#1d1d1d',
    white: '#fff',
    lightGray: '#bbbbbb',
    gray: '#7e7e7e',
    red: '#ac1212',
    purple: '#6b4faa',
    lightPurple: '#8360d0',
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
    color: getColors.black,
  },
  textSubtitle: {
    fontWeight: 'bold',
    fontSize: 26,
    color: getColors().black,
  },
});

export { generalStyles, getColors };
