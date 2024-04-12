import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import Main from './src/Main';
import AmountProvider from './src/providers/AmountProvider';
import FilesManagementProvider from './src/providers/FileManagementProvider';
import FunctionsProvider from './src/providers/FunctionsProvider';
import NotificationProvider from './src/providers/NotificationProvider';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FunctionsProvider>
        <NavigationContainer>
          <AmountProvider>
            <PaperProvider>
              <FilesManagementProvider>
                <NotificationProvider>
                  <Main />
                  <StatusBar style="auto" />
                </NotificationProvider>
              </FilesManagementProvider>
            </PaperProvider>
          </AmountProvider>
        </NavigationContainer>
      </FunctionsProvider>
    </SafeAreaView>
  );
}
