import { StyleSheet, Text, View } from 'react-native';
import { Card, Icon } from 'react-native-paper';

import { BalanceTable } from '../../components/BalanceTable';
import FloatButton from '../../components/FloatButton';
import { colors, generalStyles } from '../../generalStyles';
import { MOVEMENTTYPE } from '../../hooks/useMovements';
import { useAmountContext } from '../../providers/amountProvider';

const BalanceMovementsPage = ({ route, navigation }) => {
  const { movements } = useAmountContext();
  const { movementType } = route.params;

  return (
    <>
      <View style={generalStyles.container}>
        <Card style={generalStyles.card}>
          <View style={styles.titleContainer}>
            {movementType === MOVEMENTTYPE.INCOME ? (
              <Icon source="arrow-up-bold" color={colors.black} size={30} />
            ) : (
              <Icon source="arrow-down-bold" color={colors.black} size={30} />
            )}

            <Text style={{ ...generalStyles.textTitle, flex: 1 }}>
              Balance {movementType} movements
            </Text>
          </View>

          <BalanceTable
            movements={movements.filter((movement) => movement.type === movementType)}
            movementType={movementType}
          />
        </Card>
      </View>

      <FloatButton onPress={() => navigation.navigate('Add Movement', { movementType })} />
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
