import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { BalanceTable } from '../../components/BalanceTable';
import FloatButton from '../../components/FloatButton';
import MovementsFilters from '../../components/MovementsFilters';
import { generalStyles, getColors } from '../../generalStyles';
import { useMovementsContext, MOVEMENTTYPE } from '../../providers/MovementsProvider';

function BalanceMovementsScreen({ navigation }) {
  const { movements } = useMovementsContext();
  const [showAddButtons, setShowAddButtons] = useState(false);
  const color = getColors();

  const goToPage = (movementType) => {
    navigation.navigate('addMovement', {
      movementType,
    });
    setShowAddButtons(false);
  };

  return (
    <>
      <ScrollView>
        <View style={generalStyles.container}>
          {movements.length === 0 ? (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 30,
                fontWeight: 'bold',
                color: color.lightGray,
              }}
            >
              Without movements
            </Text>
          ) : (
            <MovementsFilters originalMovements={movements}>
              <BalanceTable />
            </MovementsFilters>
          )}
        </View>
      </ScrollView>

      {/* Add movements */}
      {showAddButtons && (
        <>
          <FloatButton
            bottom={120}
            right={15}
            size={30}
            icon="arrow-up-bold"
            onPress={() => goToPage(MOVEMENTTYPE.INCOME)}
          />
          <FloatButton
            bottom={70}
            right={15}
            size={30}
            icon="arrow-down-bold"
            onPress={() => goToPage(MOVEMENTTYPE.SPEND)}
          />
        </>
      )}
      <FloatButton
        onPress={() => {
          setShowAddButtons(!showAddButtons);
        }}
      />
    </>
  );
}

export default BalanceMovementsScreen;
