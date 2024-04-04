import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import Main from './src/Main';
import AmountProvider from './src/providers/amountProvider';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PaperProvider>
        <NavigationContainer>
          <AmountProvider>
            <Main />
            <StatusBar style="auto" />
          </AmountProvider>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaView>
  );
}
