import {
  Pressable,
  SafeAreaView,
  View,
  ViewStyle,
  Animated,
  Platform,
  Text,
} from 'react-native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import MapView, { Callout, MapMarker, Marker } from 'react-native-maps';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AppColors } from '../theme/colors';
import { RootStackParamList } from '../navigators/AppNavigator';
import { observer } from 'mobx-react-lite';
import { useMapStore } from '../store/mapStore';
import { MenuOptions } from '../components/ZoneMenuOptions';
import { Marker as MarkerType } from '../store/mapStore';
import { runInAction } from 'mobx';
import { useFocusEffect } from '@react-navigation/native';
import { currentUser } from '../testData';

type Props = NativeStackScreenProps<RootStackParamList, 'ZoneHome'>;

export const ZoneScreen = observer(({ route, navigation }: Props) => {
  const { zoneId } = route.params;
  const [hasOpenMenu, setHasOpenMenu] = useState(false);

  const toggleMenu = () => {
    setHasOpenMenu(!hasOpenMenu);
  };

  // useFocusEffect(() => {
  //   const map = useMapStore();
  //     console.log('HELLO');
  //     runInAction(() => {
  //       console.log('HELLO');
  //       map.zoneId = zoneId;
  //     });
  // });

  useLayoutEffect(() => {
    const mapStoreZoneId = useMapStore().zoneId;
    console.log('mapStoreZoneId in ZoneScreen', mapStoreZoneId);
    navigation.setOptions({
      headerShown: false,
      title: `Zone ${zoneId}`,
      headerRight: () => (
        <Pressable
          style={{
            marginRight: 0,
            backgroundColor: AppColors.success700,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
          onPress={toggleMenu}
        >
          <Ionicons name={'menu'} size={24} color={'white'} />
        </Pressable>
      ),
    });
  }, [navigation, zoneId]);

  const map = useMapStore();
  const { myLocation, myLocationMarker, zone } = map;
  // console.log('map', map.myLocation);

  // console.log(zone?.members)

  return (
    <SafeAreaView style={{ position: 'relative' }}>
      {/* TODO: separate Overlay/Menu component */}
      <View style={$overlay}>
        <Pressable
          pointerEvents="box-only"
          style={{
            padding: 10,
            backgroundColor: hasOpenMenu
              ? AppColors.neutral600
              : AppColors.success700,
            borderRadius: 5,
            margin: 10,
            elevation: 5,
          }}
          onPress={toggleMenu}
        >
          <Ionicons
            name={hasOpenMenu ? 'close' : 'menu'}
            size={30}
            color={'white'}
          />
        </Pressable>
        {hasOpenMenu && <MenuOptions navigation={navigation} />}
      </View>
      {myLocation && (
        <MapView
          style={{ height: '100%' }}
          initialRegion={map.initialRegion}
        >
          {zone?.members.map((member) => (
            <Marker
              key={member.userId}
              coordinate={{
                latitude: member.location.latitude,
                longitude: member.location.longitude,
              }}
              title={member.username}
            >
              <Callout tooltip={true} style={{minWidth: 200, elevation: 5, shadowRadius: 5, shadowColor: "#000000", shadowOffset: {height: 5, width: 5}}}>
                <InfoWindowContent marker={member.marker!} />
              </Callout>
            </Marker>
          ))}
          {/* {myLocationMarker && (
            <Marker
              key={myLocationMarker.id}
              coordinate={{
                latitude: myLocationMarker.location.latitude!,
                longitude: myLocationMarker.location.longitude!,
              }}
              title={myLocationMarker.title}
            >
              <Callout tooltip={true} style={{minWidth: 200, elevation: 5, shadowRadius: 5, shadowColor: "#000000", shadowOffset: {height: 5, width: 5}}}>
                <InfoWindowContent marker={myLocationMarker} />
              </Callout>
            </Marker>
          )} */}
        </MapView>
      )}
    </SafeAreaView>
  );
});

const InfoWindowContent = ({ marker }: { marker: MarkerType }) => {
  return (
    <View style={{justifyContent: "center", backgroundColor: "white", padding: 10, borderWidth: 1, borderRadius: 10}}>
      <Text style={{textAlign: 'center', fontWeight: "bold"}}>{marker.title}</Text>
      {marker.body && <Text style={{textAlign: 'center'}}>{marker.body}</Text>}
      {/* Additional content */}
    </View>
  );
};

// //TODO: move to separate file
// const MenuOptions = ({
//   navigation,
// }: {
//   navigation: NativeStackNavigationProp<RootStackParamList, 'Zone'>;
// }) => {
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const translateAnim = useRef(new Animated.Value(20)).current;

//   const translateIn = () => {
//     Animated.timing(translateAnim, {
//       toValue: 0,
//       duration: 200,
//       useNativeDriver: true,
//     }).start();
//   };

//   const fadeIn = () => {
//     // Will change fadeAnim value to 1 in 5 seconds
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 200,
//       useNativeDriver: true,
//     }).start();
//   };

//   const fadeOut = () => {
//     // Will change fadeAnim value to 0 in 3 seconds
//     Animated.timing(fadeAnim, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   };

//   useLayoutEffect(() => {
//     translateIn();
//     fadeIn();
//     return () => {
//       fadeOut();
//     };
//   }, []);

//   return (
//     <Animated.View
//       style={{ opacity: fadeAnim, transform: [{ translateX: translateAnim }] }}
//     >
//       <Pressable
//         style={{
//           padding: 10,
//           backgroundColor: AppColors.success700,
//           borderRadius: 5,
//           margin: 10,
//         }}
//         onPress={() => console.log('pressed')}
//       >
//         <Ionicons name={'text'} size={24} color={'white'} />
//       </Pressable>
//       <Pressable
//         style={{
//           padding: 10,
//           backgroundColor: AppColors.success700,
//           borderRadius: 5,
//           margin: 10,
//         }}
//         onPress={() => console.log('pressed')}
//       >
//         <Ionicons name={'code'} size={24} color={'white'} />
//       </Pressable>
//       <Pressable
//         style={{
//           padding: 10,
//           backgroundColor: AppColors.success700,
//           borderRadius: 5,
//           margin: 10,
//         }}
//         onPress={() => navigation.navigate('Home', { deviceId: '123' })}
//       >
//         <Ionicons name={'md-exit-outline'} size={24} color={'white'} />
//       </Pressable>
//     </Animated.View>
//   );
// };

const $overlay: ViewStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 1,
  paddingTop: 45, //Platform.OS === 'android' ? 25 : 0,
  backgroundColor: 'rgba(0,0,0,0)',
};
