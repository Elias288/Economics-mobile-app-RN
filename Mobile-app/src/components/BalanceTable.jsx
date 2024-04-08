import { useState } from 'react';
import { Text, View } from 'react-native';
import { DataTable, Icon, Portal } from 'react-native-paper';

import { ViewMovementModal } from './ViewMovementModal';
import CustomModal, { customModalStyles } from '../components/CustomModal';
import { MOVEMENTTYPE } from '../hooks/useMovements';
import '../types/movementType';
import { useMovementsContext } from '../providers/MovementsContext';
import { useFunctionProvider } from '../providers/functionsProvider';

/**
 * Balance Table
 * @param {Object} params
 * @param {Array<movementObject>} params.movements
 * @returns {ReactNode}
 */
export const BalanceTable = ({ movements }) => {
  const { deleteMovement } = useMovementsContext();
  const { formatAmount } = useFunctionProvider();

  const [showModal, setShowModal] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState(
    /** @type {movementObject | undefined} */ ({})
  );

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

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
          <DataTable.Title>Description</DataTable.Title>
          <DataTable.Title>Category</DataTable.Title>
          <DataTable.Title>Amount</DataTable.Title>
        </DataTable.Header>

        {movements.map((item, index) => (
          <DataTable.Row
            key={index}
            onPress={() => showMovement(item)}
            style={{ marginBottom: 10 }}
          >
            {/* Description and date */}
            <DataTable.Cell>
              <View style={{ flexDirection: 'column', paddingHorizontal: 3 }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{item.desc}</Text>
                <Text>{item.date.toLocaleDateString()}</Text>
              </View>
            </DataTable.Cell>

            {/* Category */}
            <DataTable.Cell>
              <Text>{item.cat}</Text>
            </DataTable.Cell>

            {/* Spends */}
            <DataTable.Cell>
              <Icon
                size={20}
                source={item.type === MOVEMENTTYPE.INCOME ? 'arrow-up-bold' : 'arrow-down-bold'}
                color={item.type === MOVEMENTTYPE.INCOME ? 'green' : 'red'}
              />
              <Text style={{ fontWeight: 'bold' }}>
                {item.type === MOVEMENTTYPE.SPEND ? '-' : ' '}${formatAmount(item.amount)}
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

      <Portal>
        {/* View movement */}
        <ViewMovementModal
          showModal={showModal}
          hideModal={() => setShowModal(false)}
          selectedMovement={selectedMovement}
          setDeleteMovement={setDeleteMovement}
        />

        {/* Confirm delete movement */}
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
      </Portal>
    </>
  );
};
