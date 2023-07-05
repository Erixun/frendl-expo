import {
  Pressable,
  SafeAreaView,
  View,
  ViewStyle,
  Platform,
  Animated,
  Keyboard,
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
import { AppMessenger } from './ZoneChatScreen';

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
      contentStyle: {
        backgroundColor: AppColors.neutral500,
      },
    });
  }, [navigation, zoneId]);

  const map = useMapStore();
  const { myLocation, zone } = map;

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
  const translateY = useState(new Animated.Value(0))[0];

  const handleFallBackAnimation = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
    Animated.spring(translateY, {
      toValue: 20,
      useNativeDriver: true,
    }).start();
  };

  const handleResetAnimation = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const [message, setMessage] = useState('');

  const changeMessage = (text: string) => {
    setMessage(text);
  };

  const handleSendMessage = () => {
    Keyboard.dismiss();
    setCanShowMessenger(false);
    if (!message) return;

    zone
      ?.sendMessage(message)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setMessage('');
      });
  };

  const [canShowMessenger, setCanShowMessenger] = useState(false);

  const toggleMessenger = () => {
    setCanShowMessenger(!canShowMessenger);
  };

  const clearActiveOptions = () => {
    setCanShowMessenger(false);
    setIsMembersModalOpen(false);
  };

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        elevation: 5,
        alignContent: 'flex-end',
        transform: [{ scale: scale }, { translateY: translateY }],
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
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
              clearActiveOptions={clearActiveOptions}
              isMembersModalOpen={isMembersModalOpen}
              onOpenMembersModal={handleOpenMembersModal}
              canShowMessenger={canShowMessenger}
              onToggleMessenger={toggleMessenger}
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

        {canShowMessenger && (
          <AppMessenger
            message={message}
            changeMessage={changeMessage}
            handleSendMessage={handleSendMessage}
          />
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
  flex: 1,
  alignItems: 'flex-end',
  paddingTop: Platform.OS === 'android' ? 25 : 0,
  backgroundColor: 'rgba(0,0,0,0)',
};
