import { makeAutoObservable, runInAction, reaction } from 'mobx';
import { LocationObjectCoords, LocationSubscription } from 'expo-location';
import * as Location from 'expo-location';

export interface Marker {
  id: string;
  location: LocationObjectCoords;
  title: string;
}

export class MapStore {
  positionSubscription: LocationSubscription | null = null;
  myLocation: LocationObjectCoords | null = null;
  myLocationMarker: Marker | null = null;
  isMyLocationLoading = false;
  markers: Marker[] = [];

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.myLocation,
      (location) => {
        if (location) {
          this.displayMyLocationMarker();
        }
      }
    );
  }

  watchMyLocation() {
    this.isMyLocationLoading = true;

    Location.requestForegroundPermissionsAsync().then((permissionResult) => {
      if (permissionResult.granted) {
        console.log('Location permission granted');
        Location.watchPositionAsync(
          {
            accuracy: Location.LocationAccuracy.High,
            timeInterval: 100, // Update location every 5 seconds
          },
          (positionResult) => {
            // const { latitude, longitude } = positionResult.coords;
            const location = positionResult.coords;
            console.log('Location update!', location);
            runInAction(() => {
              this.myLocation = location;
              this.isMyLocationLoading = false;
            });
          }
        ).then((subscription) => {
          runInAction(() => {
            this.positionSubscription = subscription;
          });
        });
      } else {
        console.error('Location permission denied');
        runInAction(() => {
          this.isMyLocationLoading = false;
        });
      }
    });
  }

  stopWatchingMyLocation() {
    if (this.positionSubscription) {
      this.positionSubscription.remove();
    }
  }

  displayMyLocationMarker() {
    if (this.myLocation) {
      const myLocationMarker: Marker = {
        id: 'myLocationMarker',
        location: this.myLocation,
        title: 'My Location',
      };

      // const existingMarker = this.markers.find(
      //   (marker) => marker.id === myLocationMarker.id
      // );

      runInAction(() => {
        // this.markers.push(myLocationMarker);
        this.myLocationMarker = myLocationMarker;
      });
    }
  }
}

const store = new MapStore();

export function useMapStore(): MapStore {
  return store;
}
