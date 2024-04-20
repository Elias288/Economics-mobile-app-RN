import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DataTable, Icon, Portal } from 'react-native-paper';

import { ViewMovementModal } from './ViewMovementModal';
import CustomModal, { customModalStyles } from '../components/CustomModal';
import '../types/movementType';
import { getComponentsColors } from '../generalStyles';
import { useFunctionProvider } from '../providers/FunctionsProvider';
import { useMovementsContext, MOVEMENTTYPE } from '../providers/MovementsProvider';
import { NOTIFICATION_TYPE, useNotificationProvider } from '../providers/NotificationProvider';

const { table_text } = getComponentsColors();

/**
 * Balance Table
 * @param {Object} params
 * @param {Array<movementObject>} params.movements
 * @returns {ReactNode}
 */
export const BalanceTable = ({ movements }) => {
  const { movementsDispatch } = useMovementsContext();
  const { formatAmount } = useFunctionProvider();
  const { setSnackBarContent, showSnackbar } = useNotificationProvider();

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
    movementsDispatch({ type: 'remove_movement', movementIdToDelete: selectedMovement.Id });
    setShowConfirmDialog(false);
    setShowModal(false);

    setSnackBarContent({ text: 'Movement correctly eliminated', type: NOTIFICATION_TYPE.OK });
    showSnackbar();
  };

  return (
    <>
      <DataTable style={{ marginBottom: 20 }}>
        <DataTable.Header>
          <DataTable.Title textStyle={{ color: table_text }}>Description</DataTable.Title>
          <DataTable.Title textStyle={{ color: table_text }}>Category</DataTable.Title>
          <DataTable.Title textStyle={{ color: table_text }}>Amount</DataTable.Title>
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
                <Text style={styles.descriptionTitle}>{item.desc}</Text>
                <Text style={{ color: table_text }}>{item.date.toLocaleDateString()}</Text>
              </View>
            </DataTable.Cell>

            {/* Category */}
            <DataTable.Cell>
              <Text style={{ color: table_text }}>{item.cat}</Text>
            </DataTable.Cell>

            {/* Spends */}
            <DataTable.Cell>
              <Icon
                size={20}
                source={item.type === MOVEMENTTYPE.INCOME ? 'arrow-up-bold' : 'arrow-down-bold'}
                color={item.type === MOVEMENTTYPE.INCOME ? 'green' : 'red'}
              />
              <Text style={{ fontWeight: 'bold', color: table_text }}>
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

const styles = StyleSheet.create({
  descriptionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: table_text,
  },
});
