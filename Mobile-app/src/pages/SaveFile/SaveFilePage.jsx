import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon, TextInput, IconButton } from 'react-native-paper';

import MovementsTable from './MovementsTable';
import { generalStyles, getColors } from '../../generalStyles';
import { useAmountContext } from '../../providers/AmountProvider';
import { useFilesManagementProvider } from '../../providers/FileManagementProvider';
import { useFunctionProvider } from '../../providers/FunctionsProvider';
import { useMovementsContext } from '../../providers/MovementsProvider';
import { useNotificationProvider } from '../../providers/NotificationProvider';

const color = getColors();

function SaveFilePage({ navigation }) {
  const { totalAmount, initialBalance } = useAmountContext();
  const { movements } = useMovementsContext();
  const { formatAmount } = useFunctionProvider();
  const { saveCSV, createSCV } = useFilesManagementProvider();
  const { setSnackBarContent, showSnackbar } = useNotificationProvider();

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
    const csvData = createSCV(movements, totalAmount, initialBalance);

    saveCSV(csvData, fileName + '.csv', type);

    setSnackBarContent('Saved file: ' + fileName + '.csv');
    showSnackbar();

    navigation.navigate('home');
  };

  const changeFileName = () => {
    setFileName(newFileName);
    setIsEdit(false);
  };

  return (
    <View style={{ ...generalStyles.container, paddingBottom: 30 }}>
      {/* File Name */}
      <View style={styles.fileNameContainer}>
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
                Save
              </Button>
              <Button mode="contained" style={{ flex: 1 }} onPress={() => setIsEdit(false)}>
                Cancel
              </Button>
            </View>
          </>
        )}
      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.amountContainer}>
          <View style={styles.amountChip}>
            <Text style={styles.amountChipTitle}>Total amount</Text>
            <Text style={styles.amountChipText}>${formatAmount(totalAmount)}</Text>
          </View>

          {initialBalance !== 0 && (
            <View style={styles.amountChip}>
              <Text style={styles.amountChipTitle}>Initial balance</Text>
              <Text style={styles.amountChipText}>${formatAmount(initialBalance)}</Text>
            </View>
          )}
        </View>

        {/* Data table */}
        <MovementsTable data={movements} />
      </View>

      {/* Actions */}
      <View style={styles.actionContainer}>
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

const styles = StyleSheet.create({
  fileNameContainer: {
    marginBottom: 20,
    gap: 10,
  },
  amountContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  amountChip: {
    flexDirection: 'column',
    backgroundColor: color.purple,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  amountChipTitle: {
    color: color.white,
    fontWeight: '400',
    fontSize: 15,
  },
  amountChipText: {
    color: color.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
});

export default SaveFilePage;
