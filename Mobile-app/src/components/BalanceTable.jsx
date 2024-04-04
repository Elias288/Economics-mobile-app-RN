import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button, DataTable } from 'react-native-paper';

import CustomModal, { customModalStyles } from '../components/CustomModal';
import formatAmount from '../functions/formatAmount';
import minimizeNumber from '../functions/minimizeNumber';
import { colors } from '../generalStyles';
import { useAmountContext } from '../providers/amountProvider';
import '../types/movementType';

/**
 * Balance Table
 * @param {Object} params
 * @param {Array<movementObject>} params.movements
 * @param {string} params.movementType
 * @returns {ReactNode}
 */
export const BalanceTable = ({ movements, movementType }) => {
  const { deleteMovement } = useAmountContext();

  const [showModal, setShowModal] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState(
    /** @type {movementObject | undefined} */ ({})
  );

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const tableHead = [
    { title: 'Date', size: 1 },
    { title: 'Amount', size: 1 },
    { title: 'Description', size: 2 },
    { title: 'Category', size: 1 },
  ];

  /**
   * Show movement
   * @param {movementObject} movement
   */
  const showMovement = (movement) => {
    setSelectedMovement(movement);
    setShowModal(true);
  };

  const setDeleteMovement = () => {
    setShowConfirmDialog(true);
  };

  const onDelete = () => {
    deleteMovement(selectedMovement.Id);
    setShowConfirmDialog(false);
    setShowModal(false);
  };

  return (
    <>
      <DataTable style={{ marginBottom: 20 }}>
        <DataTable.Header>
          {tableHead.map((item, index) => (
            <DataTable.Title key={index} style={{ flex: item.size }}>
              {item.title}
            </DataTable.Title>
          ))}
        </DataTable.Header>

        {movements.map((item, index) => (
          <DataTable.Row key={index} onPress={() => showMovement(item)}>
            <DataTable.Cell style={{ flex: tableHead[0].size }}>
              {item.date.toLocaleString()}
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: tableHead[1].size }}>
              {item.amount ? `$${minimizeNumber(item.amount)}` : ''}
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: tableHead[2].size }}>{item.desc}</DataTable.Cell>
            <DataTable.Cell style={{ flex: tableHead[3].size }}>{item.cat}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

      <CustomModal isVisible={showModal} hideModal={() => setShowModal(false)}>
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={styles.boldText}>Amount</Text>
            </DataTable.Cell>
            <DataTable.Cell>${formatAmount(selectedMovement.amount)}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell style={styles.boldText}>
              <Text style={styles.boldText}>Category</Text>
            </DataTable.Cell>
            <DataTable.Cell>{selectedMovement.cat}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell style={styles.boldText}>
              <Text style={styles.boldText}>Description</Text>
            </DataTable.Cell>
            <DataTable.Cell>{selectedMovement.desc}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell style={styles.boldText}>
              <Text style={styles.boldText}>Date</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              {selectedMovement.date && selectedMovement.date.toLocaleDateString()}
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>

        <Button
          mode="contained"
          style={{ backgroundColor: colors.red, marginTop: 20 }}
          onPress={setDeleteMovement}
        >
          Delete
        </Button>
      </CustomModal>

      <CustomModal
        isVisible={showConfirmDialog}
        hideModal={() => setShowConfirmDialog(false)}
        onAccept={onDelete}
        onCancel={() => setShowConfirmDialog(false)}
      >
        <Text style={customModalStyles.modalMessage}>
          Are you sure you want to eliminate this movement?
        </Text>
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
