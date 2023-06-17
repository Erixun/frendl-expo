import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigators/AppNavigator';
import * as Location from 'expo-location';
import { useEffect } from 'react';
import { Alert } from 'react-native';

import * as TaskManager from 'expo-task-manager';
import { useMapStore } from './store/mapStore';

TaskManager.defineTask('locationTask', ({ data: { locations }, error }) => {
 if (error) {
   // check `error.message` for more details.
   console.log('error', error);
   return;
 }
 console.log('Received new locations', locations);
});


export default function App() {
  const mapStore = useMapStore();

  useEffect(() => {
    mapStore.watchMyLocation();
    //TODO: move to a service
    // (async () => {
      
    //   let { status } = await Location.requestBackgroundPermissionsAsync();
    //   if (status !== 'granted') {
    //     Alert.alert('Permission to access location was denied');
    //     // setErrorMsg('Permission to access location was denied');
    //     return;
    //   }
    //   await Location.startLocationUpdatesAsync('locationTask', {
    //     accuracy: Location.Accuracy.Balanced,
    //   });
    //   let location = await Location.getCurrentPositionAsync({});
    //   // mapStore.myLocation = location.coords;
    //   Alert.alert(JSON.stringify(location));
    //   console.log(location)
    //   // setLocation(location);
    // })();
  }, []);


  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <AppNavigator />
    </NavigationContainer>
  );
}
