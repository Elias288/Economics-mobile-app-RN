import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import Main from './src/Main';
import AmountProvider from './src/providers/AmountProvider';
import FunctionsProvider from './src/providers/functionsProvider';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FunctionsProvider>
        <NavigationContainer>
          <AmountProvider>
            <PaperProvider>
              <Main />
              <StatusBar style="auto" />
            </PaperProvider>
          </AmountProvider>
        </NavigationContainer>
      </FunctionsProvider>
    </SafeAreaView>
  );
}
