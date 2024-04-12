import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ActivityIndicator } from 'react-native-paper';

import { generalStyles } from '../generalStyles';
import { useFilesManagementProvider } from '../providers/FileManagementProvider';

function InitialPage({ navigation }) {
  const { openCSV } = useFilesManagementProvider();

  const [showSpinner, setShowSpinner] = useState(false);

  const onOpen = async () => {
    setShowSpinner(true);
    await openCSV();
    setShowSpinner(false);

    navigation.navigate('homeNav');
  };

  return (
    <View style={{ ...generalStyles.container, paddingBottom: 0 }}>
      <View style={styles.centerContainer}>
        {!showSpinner && (
          <>
            <Button mode="contained" onPress={() => navigation.navigate('homeNav')}>
              <Text style={styles.buttonText}>Create new entry</Text>
            </Button>

            <Button mode="contained" onPress={onOpen}>
              <Text style={styles.buttonText}>Open entry</Text>
            </Button>
          </>
        )}

        {showSpinner && <ActivityIndicator animating />}
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
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
});

export default InitialPage;
