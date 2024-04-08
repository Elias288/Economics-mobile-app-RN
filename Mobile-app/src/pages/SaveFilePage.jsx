import { ScrollView, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-paper';

import { generalStyles } from '../generalStyles';
import { useFunctionProvider } from '../providers/functionsProvider';

function SaveFilePage() {
  const { saveCSV, createSCV } = useFunctionProvider();

  const onSave = (type) => {
    const csvData = createSCV('');

    const date = new Date();
    const formatDate = `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
    const fileName = `datos_${formatDate}.csv`;

    saveCSV(csvData, fileName, type);
  };

  return (
    <ScrollView>
      <View style={generalStyles.container}>
        <Text>File name:</Text>

        {/* Actions */}
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Button onPress={() => onSave('local')} mode="contained" style={{ flex: 1 }}>
            <Icon source="folder-download" color="#fff" size={20} /> <Text>save</Text>
          </Button>

          <Button onPress={() => onSave('remote')} mode="contained" style={{ flex: 1 }}>
            <Icon source="google-drive" color="#fff" size={20} /> <Text>save</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

export default SaveFilePage;
