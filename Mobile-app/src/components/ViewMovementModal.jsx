import { StyleSheet, Text } from 'react-native';
import { Button, DataTable } from 'react-native-paper';

import CustomModal from '../components/CustomModal';
import { getComponentsColors } from '../generalStyles';
import { useFunctionProvider } from '../providers/FunctionsProvider';
import { MOVEMENTTYPE } from '../providers/MovementsProvider';

const { button_cancel_background, dark_text_color } = getComponentsColors();

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
            <Text style={{ color: dark_text_color }}>
              {selectedMovement.type === MOVEMENTTYPE.SPEND ? '-' : ''}$
              {formatAmount(selectedMovement.amount)}
            </Text>
          </DataTable.Cell>
        </DataTable.Row>

        {/* Category */}
        <DataTable.Row>
          <DataTable.Cell style={styles.boldText}>
            <Text style={styles.boldText}>Category</Text>
          </DataTable.Cell>
          <DataTable.Cell style={{ flex: 1 }}>
            <Text style={{ color: dark_text_color }}>{selectedMovement.cat}</Text>
          </DataTable.Cell>
        </DataTable.Row>

        {/* Description */}
        <DataTable.Row>
          <DataTable.Cell style={styles.boldText}>
            <Text style={styles.boldText}>Description</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text style={{ color: dark_text_color }}>{selectedMovement.desc}</Text>
          </DataTable.Cell>
        </DataTable.Row>

        {/* Date */}
        <DataTable.Row>
          <DataTable.Cell style={styles.boldText}>
            <Text style={styles.boldText}>Date</Text>
          </DataTable.Cell>
          <DataTable.Cell style={{ flex: 1 }}>
            <Text style={{ color: dark_text_color }}>
              {selectedMovement.date && selectedMovement.date.toLocaleDateString()}
            </Text>
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>

      <Button
        mode="contained"
        style={{ backgroundColor: button_cancel_background, marginTop: 20 }}
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
    color: dark_text_color,
  },
});
