import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigators/AppNavigator';
import { useEffect } from 'react';
import { useMapStore } from './store/mapStore';
import { SafeAreaView } from 'react-native';

export default function App() {
  const mapStore = useMapStore();

  useEffect(() => {
    mapStore.watchMyLocation();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}
