import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import Main from './src/Main';
import { es, registerTranslation } from 'react-native-paper-dates'
registerTranslation('es', es)

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Main />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
