import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Icon } from 'react-native-paper';

import { BalanceTable } from '../../components/BalanceTable';
import FloatButton from '../../components/FloatButton';
import MovementsFilters from '../../components/MovementsFilters';
import { generalStyles, getColors } from '../../generalStyles';
import { MOVEMENTTYPE } from '../../hooks/useMovements';
import { useMovementsContext } from '../../providers/MovementsContext';

const colors = getColors();

const BalanceMovementsPage = ({ route, navigation }) => {
  const { movements } = useMovementsContext();
  const { movementType } = route.params;
  const [movementsToList, setMovementsToList] = useState(/** @type {movementObject[]} */ ([]));

  // Charge movements to list
  useEffect(() => {
    setMovementsToList(movements.filter((movement) => movement.type === movementType));
  }, [movements, movementType]);

  return (
    <>
      <View style={generalStyles.container}>
        <Card style={generalStyles.card}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <Icon
              source={movementType === MOVEMENTTYPE.INCOME ? 'arrow-up-bold' : 'arrow-down-bold'}
              color={colors.black}
              size={30}
            />

            <Text style={{ ...generalStyles.textTitle, flex: 1 }}>
              Balance {movementType} movements
            </Text>
          </View>

          {/* Filter */}
          <MovementsFilters />

          {/* Movements */}
          <BalanceTable movements={movementsToList} movementType={movementType} />
        </Card>
      </View>

      <FloatButton onPress={() => navigation.navigate('addMovement', { movementType })} />
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 2,
    paddingBottom: 20,
    marginBottom: 20,
  },
});

export default BalanceMovementsPage;
