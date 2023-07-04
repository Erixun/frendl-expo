import {
  Pressable,
  SafeAreaView,
  View,
  ViewStyle,
  Platform,
  Animated,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MapView from 'react-native-maps';
import React, { useLayoutEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AppColors } from '../theme/colors';
import { RootStackParamList } from '../navigators/AppNavigator';
import { observer } from 'mobx-react-lite';
import { useMapStore } from '../store/mapStore';
import { MenuOptions } from '../components/ZoneMenuOptions';
import { ZoneMembersModal } from '../components/ZoneMembersModal';
import { ZoneMarker } from '../components/ZoneMarker';

type Props = NativeStackScreenProps<RootStackParamList, 'ZoneHome'>;

export const ZoneScreen = observer(({ route, navigation }: Props) => {
  const { zoneId } = route.params;
  const [hasOpenMenu, setHasOpenMenu] = useState(false);

  const toggleMenu = () => {
    setHasOpenMenu(!hasOpenMenu);
  };

  useLayoutEffect(() => {
    const mapStoreZoneId = useMapStore().zoneId;
    console.log('mapStoreZoneId in ZoneScreen', mapStoreZoneId);
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation, zoneId]);

  const map = useMapStore();
  const { myLocation, myLocationMarker, zone } = map;

  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);

  const handleOpenMembersModal = () => {
    handleFallBackAnimation();
    setIsMembersModalOpen(true);
  };

  const handleCloseMembersModal = () => {
    handleResetAnimation();
    setIsMembersModalOpen(false);
  };

  const scale = useState(new Animated.Value(1))[0];

  const handleFallBackAnimation = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handleResetAnimation = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        position: 'relative',
        flex: 1,
        alignContent: 'flex-end',
        transform: [{ scale: scale }],
        borderRadius: 10,
        overflow: 'hidden',
      }}
    >
      <SafeAreaView
        style={{
          position: 'relative',
          flex: 1,
          alignContent: 'flex-end',
          borderRadius: 10,
        }}
      >
        <View style={$overlay} pointerEvents="box-none">
          <Pressable
            pointerEvents="auto"
            style={{
              padding: 10,
              backgroundColor: hasOpenMenu
                ? AppColors.neutral600
                : AppColors.success700,
              borderRadius: 5,
              margin: 10,
              elevation: 5,
              alignSelf: 'flex-end',
            }}
            onPress={toggleMenu}
          >
            <Ionicons
              name={hasOpenMenu ? 'close' : 'menu'}
              size={30}
              color={'white'}
            />
          </Pressable>
          {hasOpenMenu && (
            <MenuOptions
              navigation={navigation}
              onOpenMembersModal={handleOpenMembersModal}
            />
          )}
        </View>
        {myLocation && (
          <MapView
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: -1,
            }}
            initialRegion={map.initialRegion}
          >
            {zone?.members.map((member) => (
              <ZoneMarker key={member.userId} member={member} zone={zone} />
            ))}
          </MapView>
        )}
        <ZoneMembersModal
          isVisible={isMembersModalOpen}
          onCloseModal={handleCloseMembersModal}
        />
      </SafeAreaView>
    </Animated.View>
  );
});

const $overlay: ViewStyle = {
  alignItems: 'flex-end',
  paddingTop: Platform.OS === 'android' ? 25 : 0,
  backgroundColor: 'rgba(0,0,0,0)',
};
