import { makeAutoObservable, runInAction, reaction } from 'mobx';
import { LocationObjectCoords, LocationSubscription } from 'expo-location';
import * as Location from 'expo-location';
import { ZoneMember, ZoneStore } from './zoneStore';
import pusherClient from '../services/pusher';
import { Channel } from 'pusher-js';
import writeContent from '../utils/writeContent';
import { currentUser } from '../testData';
import { postToUpdateLocation } from '../services/ws';

export interface Marker {
  id: string;
  location: Partial<LocationObjectCoords>;
  title: string;
  body: string;
}

export class MapStore {
  currentUser: ZoneMember | undefined;
  currentUserId: string | undefined;
  myLocation: LocationObjectCoords | null = null;
  myLocationMarker: Marker | null = null;
  isMyLocationLoading = false;
  zone: ZoneStore | undefined;
  zoneId: string | undefined;
  prevZoneId: string | undefined;
  zoneChannel: Channel | undefined;
  positionSubscription: LocationSubscription | null = null;
  markers: Marker[] = [];

  constructor() {
    this.currentUser = currentUser
    makeAutoObservable(this);

    reaction(
      () => this.myLocation,
      (location) => {
        if (location) {
          this.displayMyLocationMarker();
        }
      }
    );
    reaction(
      () => this.zoneId,
      (zoneId) => {
        console.log('reaction zoneId', zoneId);
        console.log('zoneId', zoneId);
        // if (!zoneId) return;
        // this.clearZone();
        this.initZone();
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
            timeInterval: 1000, // Update location every 5 seconds
          },
          (positionResult) => {
            // const { latitude, longitude } = positionResult.coords;
            const location = positionResult.coords;
            console.log('Location update!', location);
            runInAction(() => {
              this.myLocation = location;
              this.isMyLocationLoading = false;
            });
            if (this.zoneId) {
              console.log('postToUpdateLocation');
              postToUpdateLocation(this);
            }
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
  get initialRegion() {
    return {
      latitude: this.myLocation?.latitude || 0,
      longitude: this.myLocation?.longitude || 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  }

  initZone() {
    // this.displayMemberLocations();

    console.log('initZone', this.zoneId);
    pusherClient.unsubscribe(`zone-channel-${this.prevZoneId}`);

    this.zoneChannel = pusherClient.subscribe(`zone-channel-${this.zoneId}`);

    this.zoneChannel.bind('pusher:subscription_succeeded', () => {
      console.log('pusher:subscription_succeeded');
      runInAction(() => {
        this.prevZoneId = this.zoneId;
      });
    });

    this.zoneChannel.bind('location-update', (body: any) => {
      const { userId, location } = body;

      this.zone?.updateLocation(userId, location);
    });

    this.zoneChannel.bind('chat-log-update', (body: any) => {
      const { userId, entry } = body;

      console.log('chat-log-update entry', entry);
      this.zone?.appendChatLog(entry);
      this.displayMessage(entry.message, userId);
    });

    this.zoneChannel.bind('member_added', (body: any) => {
      console.log('member_added', body);
      this.zone?.addMember(body.user, true);
    });

    this.zoneChannel.bind('member_deleted', (body: any) => {
      console.log('member_deleted', body);
      this.zone?.removeMember(body.userId);
    });
  }

  displayMessage(message: string, userId = this.currentUser?.userId) {
    if (!userId) return console.error('No userId provided');
    const member = this.zone?.memberMap.get(userId); //.find((member) => member.userId === userId);
    if (!member) return console.error('No user found for id', userId);
    member.message = message;
    const isCurrentUser = userId === this.currentUser?.userId;
    const content = writeContent(member, isCurrentUser);
    // `<b style="color: ${
    //   isCurrentUser ? CURRENT_USER_COLOR : user.userColor
    // }">${user.username}</b><br>${message}`;
    // const infoWindow = member.infoWindow;
    // if (!infoWindow)
    //   return console.error('No infoWindow found for user', member);

    // infoWindow.setContent(content);
    // infoWindow.setOptions({ maxWidth: 300 });
    // infoWindow.open(this.map, member.marker);
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
        body: 'This is where I am',
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

const map = new MapStore();

const store = { map };

export function useMapStore(): MapStore {
  return store.map;
}
