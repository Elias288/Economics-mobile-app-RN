import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon, TextInput, IconButton, Card } from 'react-native-paper';

import MovementsTable from './MovementsTable';
import { generalStyles, getComponentsColors } from '../../generalStyles';
import { useAmountContext } from '../../providers/AmountProvider';
import { useFilesManagementProvider } from '../../providers/FileManagementProvider';
import { useFunctionProvider } from '../../providers/FunctionsProvider';
import { useMovementsContext } from '../../providers/MovementsProvider';
import { NOTIFICATION_TYPE, useNotificationProvider } from '../../providers/NotificationProvider';

const {
  button_saveFile_background,
  amounts_chip_background,
  amount_text_color,
  fileName_container_background,
  text_color,
  input_background,
  button_accept_background,
} = getComponentsColors();

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

    setSnackBarContent({
      text: 'Saved file: ' + fileName + '.csv',
      type: NOTIFICATION_TYPE.OK,
    });
    showSnackbar();

    navigation.navigate('home');
  };

  const changeFileName = () => {
    setFileName(newFileName);
    setIsEdit(false);
  };

  return (
    <View style={{ ...generalStyles.container, paddingBottom: 30 }}>
      <Card style={{ ...generalStyles.card }}>
        {/* File Name */}
        <View style={styles.fileNameContainer}>
          {!isEdit ? (
            <View style={styles.fileNameVisor}>
              <Text style={{ fontSize: 18, flex: 1, color: text_color }}>
                File name: <Text style={{ fontWeight: 'bold' }}>{fileName}.csv</Text>
              </Text>
              <IconButton icon="pencil" onPress={() => setIsEdit(true)} iconColor={text_color} />
            </View>
          ) : (
            <>
              <TextInput
                value={newFileName}
                label={<Text style={{ color: text_color }}>File name</Text>}
                autoFocus
                onChangeText={(text) => setNewFileName(text)}
                style={{ backgroundColor: input_background }}
              />

              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Button
                  mode="contained"
                  style={{ flex: 1, backgroundColor: button_accept_background }}
                  onPress={changeFileName}
                >
                  Save
                </Button>
                <Button
                  mode="contained"
                  style={{ flex: 1, backgroundColor: button_accept_background }}
                  onPress={() => setIsEdit(false)}
                >
                  Cancel
                </Button>
              </View>
            </>
          )}
        </View>

        <View>
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
          <Button
            onPress={() => onSave('local')}
            mode="contained"
            style={{ flex: 1, backgroundColor: button_saveFile_background }}
          >
            <Icon source="folder-download" color="#fff" size={20} /> <Text>Save</Text>
          </Button>

          <Button
            onPress={() => onSave('remote')}
            mode="contained"
            style={{ flex: 1, backgroundColor: button_saveFile_background }}
          >
            <Icon source="share" color="#fff" size={20} /> <Text>Share</Text>
          </Button>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  fileNameContainer: {
    marginBottom: 20,
    gap: 10,
  },
  fileNameVisor: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: fileName_container_background,
    paddingHorizontal: 5,
  },
  amountContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  amountChip: {
    flexDirection: 'column',
    backgroundColor: amounts_chip_background,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1,
    maxWidth: '50%',
  },
  amountChipTitle: {
    color: amount_text_color,
    fontWeight: '400',
    fontSize: 15,
  },
  amountChipText: {
    color: amount_text_color,
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
