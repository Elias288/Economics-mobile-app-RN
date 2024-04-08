import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import { generalStyles } from '../generalStyles';

function InitialPage({ navigation }) {
  return (
    <View style={{ ...generalStyles.container, paddingBottom: 0 }}>
      <View style={styles.centerContainer}>
        <Button mode="contained" onPress={() => navigation.navigate('homeNav')}>
          <Text style={styles.buttonText}>Create new entry</Text>
        </Button>

        <Button mode="contained">
          <Text style={styles.buttonText}>Open entry</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    gap: 20,
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
});

export default InitialPage;
