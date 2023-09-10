import { StyleSheet, Text, View } from 'react-native';

function AppBar({ ...props }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>Economics Mobile App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  titleStyle: {
    color: '#fff',
  },
});

export default AppBar;
