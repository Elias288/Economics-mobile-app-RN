import { ScrollView, View } from 'react-native';

import { AmountContainer } from './AmountContainer';
import MovementContainer from './MovementsContainer';
import FloatButton from '../../components/FloatButton';
import { generalStyles } from '../../generalStyles';
import { MOVEMENTTYPE } from '../../hooks/useMovements';

function HomeScreen({ navigation }) {
  return (
    <>
      <ScrollView>
        <View style={generalStyles.container}>
          <AmountContainer />

          <MovementContainer categoryType={MOVEMENTTYPE.INCOME} />
          <MovementContainer categoryType={MOVEMENTTYPE.SPEND} />
        </View>
      </ScrollView>

      {/* TODO: hide if movements is empty */}
      <FloatButton
        icon="content-save"
        onPress={() => {
          navigation.navigate('saveFile');
        }}
      />
    </>
  );
}

export default HomeScreen;
