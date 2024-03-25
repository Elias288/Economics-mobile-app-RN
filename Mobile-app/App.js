import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Main from './src/Main';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PaperProvider>
        <Main />
        <StatusBar style="auto" />
      </PaperProvider>
    </SafeAreaView>
  );
}

