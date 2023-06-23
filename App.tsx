import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigators/AppNavigator';
import { useEffect } from 'react';

import * as TaskManager from 'expo-task-manager';
import { useMapStore } from './store/mapStore';

TaskManager.defineTask('locationTask', ({ data: { locations }, error }) => {
  if (error) {
    console.log('error', error);
    return;
  }
  console.log('Received new locations', locations);
});

export default function App() {
  const mapStore = useMapStore();

  useEffect(() => {
    mapStore.watchMyLocation();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <AppNavigator />
    </NavigationContainer>
  );
}
