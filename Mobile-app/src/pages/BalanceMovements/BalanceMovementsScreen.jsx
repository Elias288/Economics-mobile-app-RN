import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { BalanceTable } from '../../components/BalanceTable';
import FloatButton from '../../components/FloatButton';
import MovementsFilters from '../../components/MovementsFilters';
import { generalStyles } from '../../generalStyles';
import { MOVEMENTTYPE } from '../../hooks/useMovements';
import { useMovementsContext } from '../../providers/MovementsContext';

function BalanceMovementsScreen({ navigation }) {
  const { movements } = useMovementsContext();
  const [showAddButtons, setShowAddButtons] = useState(false);

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
          <MovementsFilters originalMovements={movements}>
            <BalanceTable />
          </MovementsFilters>
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
