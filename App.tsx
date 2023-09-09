import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Main from './src/Main';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Main />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}