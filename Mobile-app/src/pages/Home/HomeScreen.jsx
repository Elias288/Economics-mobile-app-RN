import { ScrollView, View } from 'react-native';

import { AmountContainer } from './AmountContainer';
import { IncomeContainer } from './IncomeContainer';
import { SpendContainer } from './SpendContainer';
import { generalStyles } from '../../generalStyles';

function HomeScreen() {
  return (
    <ScrollView>
      <View style={generalStyles.container}>
        <AmountContainer />

        <SpendContainer />

        <IncomeContainer />
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
