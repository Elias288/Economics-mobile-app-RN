import { StyleSheet, Text } from 'react-native';
import { Button, DataTable } from 'react-native-paper';

import CustomModal from '../components/CustomModal';
import { getColors } from '../generalStyles';
import { MOVEMENTTYPE } from '../providers/MovementsProvider';
import { useFunctionProvider } from '../providers/functionsProvider';

/**
 * View Movement Modal
 * @param {Object} props
 * @param {boolean} props.showModal
 * @param {movementObject | undefined} props.selectedMovement
 * @param {() => void} props.hideModal
 * @param {() => void} props.setDeleteMovement
 * @returns {import('react').ReactNode}
 */
export const ViewMovementModal = (props) => {
  const { formatAmount } = useFunctionProvider();
  const { selectedMovement, showModal, hideModal, setDeleteMovement } = props;

  return (
    <CustomModal isVisible={showModal} hideModal={hideModal}>
      <DataTable>
        {/* Amount */}
        <DataTable.Row>
          <DataTable.Cell>
            <Text style={styles.boldText}>Amount</Text>
          </DataTable.Cell>
          <DataTable.Cell style={{ flex: 1 }}>
            {selectedMovement.type === MOVEMENTTYPE.SPEND ? '-' : ''}$
            {formatAmount(selectedMovement.amount)}
          </DataTable.Cell>
        </DataTable.Row>

        {/* Category */}
        <DataTable.Row>
          <DataTable.Cell style={styles.boldText}>
            <Text style={styles.boldText}>Category</Text>
          </DataTable.Cell>
          <DataTable.Cell style={{ flex: 1 }}>
            <Text>{selectedMovement.cat}</Text>
          </DataTable.Cell>
        </DataTable.Row>

        {/* Description */}
        <DataTable.Row>
          <DataTable.Cell style={styles.boldText}>
            <Text style={styles.boldText}>Description</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text>{selectedMovement.desc}</Text>
          </DataTable.Cell>
        </DataTable.Row>

        {/* Date */}
        <DataTable.Row>
          <DataTable.Cell style={styles.boldText}>
            <Text style={styles.boldText}>Date</Text>
          </DataTable.Cell>
          <DataTable.Cell style={{ flex: 1 }}>
            {selectedMovement.date && selectedMovement.date.toLocaleDateString()}
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>

      <Button
        mode="contained"
        style={{ backgroundColor: getColors().red, marginTop: 20 }}
        onPress={setDeleteMovement}
      >
        Delete
      </Button>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
