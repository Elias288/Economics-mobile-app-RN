import { ScrollView, View } from 'react-native';

import { AmountContainer } from './AmountContainer';
import MovementContainer from './MovementsContainer';
import { generalStyles } from '../../generalStyles';
import { MOVEMENTTYPE } from '../../providers/MovementsProvider';

function HomeScreen() {
  return (
    <ScrollView>
      <View style={generalStyles.container}>
        <AmountContainer />

        <MovementContainer categoryType={MOVEMENTTYPE.INCOME} />
        <MovementContainer categoryType={MOVEMENTTYPE.SPEND} />
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
