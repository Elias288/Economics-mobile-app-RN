import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Icon, TextInput, IconButton } from 'react-native-paper';

import MovementsTable from './MovementsTable';
import { generalStyles } from '../../generalStyles';
import { useFunctionProvider } from '../../providers/FunctionsProvider';
import { useMovementsContext } from '../../providers/MovementsProvider';

function SaveFilePage() {
  const { movements } = useMovementsContext();
  const { saveCSV, createSCV } = useFunctionProvider();

  const [newFileName, setNewFileName] = useState('');
  const [fileName, setFileName] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const date = new Date();
    const formatDate = `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
    const name = `Financial_file_${formatDate}`;
    setFileName(name);
    setNewFileName(name);
  }, []);

  /**
   * on Save
   * @param {string} type
   */
  const onSave = (type) => {
    const csvData = createSCV(movements);

    saveCSV(csvData, fileName + '.csv', type);
  };

  const changeFileName = () => {
    setFileName(newFileName);
    setIsEdit(false);
  };

  return (
    <View style={{ ...generalStyles.container, paddingBottom: 30 }}>
      {/* File Name */}
      <View style={{ marginBottom: 20, gap: 10 }}>
        {!isEdit ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, flex: 1 }}>
              File name: <Text style={{ fontWeight: 'bold' }}>{fileName}.csv</Text>
            </Text>
            <IconButton icon="pencil" onPress={() => setIsEdit(true)} />
          </View>
        ) : (
          <>
            <TextInput
              value={newFileName}
              label="File name"
              autoFocus
              onChangeText={(text) => setNewFileName(text)}
            />

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Button mode="contained" style={{ flex: 1 }} onPress={changeFileName}>
                Edit
              </Button>
              <Button mode="contained" style={{ flex: 1 }} onPress={() => setIsEdit(false)}>
                Cancel
              </Button>
            </View>
          </>
        )}
      </View>

      {/* Data table */}
      <View style={{ flex: 1 }}>
        <MovementsTable data={movements} />
      </View>

      {/* Actions */}
      <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
        <Button onPress={() => onSave('local')} mode="contained" style={{ flex: 1 }}>
          <Icon source="folder-download" color="#fff" size={20} /> <Text>Save</Text>
        </Button>

        <Button onPress={() => onSave('remote')} mode="contained" style={{ flex: 1 }}>
          <Icon source="share" color="#fff" size={20} /> <Text>Share</Text>
        </Button>
      </View>
    </View>
  );
}

export default SaveFilePage;
