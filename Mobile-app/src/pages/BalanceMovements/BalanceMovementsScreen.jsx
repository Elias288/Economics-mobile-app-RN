import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { BalanceTable } from '../../components/BalanceTable';
import FloatButton from '../../components/FloatButton';
import MovementsFilters from '../../components/MovementsFilters';
import { generalStyles, getComponentsColors } from '../../generalStyles';
import { useMovementsContext, MOVEMENTTYPE } from '../../providers/MovementsProvider';

const {
  floatingButton_income_icon,
  floatingButton_income_background,
  floatingButton_spend_icon,
  floatingButton_spend_background,
  subtitle_color,
} = getComponentsColors();

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
          {movements.length === 0 ? (
            <Text style={styles.subtitle}>Without movements</Text>
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
            iconColor={floatingButton_income_icon}
            style={{ backgroundColor: floatingButton_income_background }}
          />
          <FloatButton
            bottom={70}
            right={15}
            size={30}
            icon="arrow-down-bold"
            onPress={() => goToPage(MOVEMENTTYPE.SPEND)}
            iconColor={floatingButton_spend_icon}
            style={{ backgroundColor: floatingButton_spend_background }}
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

const styles = StyleSheet.create({
  subtitle: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: subtitle_color,
  },
});

export default BalanceMovementsScreen;
