import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import Main from './src/Main';
import AmountProvider from './src/providers/AmountProvider';
import FilesManagementProvider from './src/providers/FileManagementProvider';
import FunctionsProvider from './src/providers/FunctionsProvider';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FunctionsProvider>
        <NavigationContainer>
          <AmountProvider>
            <PaperProvider>
              <FilesManagementProvider>
                <Main />
                <StatusBar style="auto" />
              </FilesManagementProvider>
            </PaperProvider>
          </AmountProvider>
        </NavigationContainer>
      </FunctionsProvider>
    </SafeAreaView>
  );
}
