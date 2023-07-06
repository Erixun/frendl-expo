import { Ionicons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRef, useLayoutEffect, createRef, useState } from 'react';
import {
  Animated,
  Pressable,
  View,
  Text,
  Alert,
  ViewStyle,
} from 'react-native';
import { RootStackParamList } from '../navigators/AppNavigator';
import { AppColors } from '../theme/colors';
import { useMapStore } from '../store/mapStore';
import * as Clipboard from 'expo-clipboard';
import { postToExitZone } from '../services/ws';
import { runMenuAnimation } from '../utils/runMenuAnimation';

export const MenuOptions = ({
  navigation,
  isMembersModalOpen,
  onOpenMembersModal,
  canShowMessenger,
  onToggleMessenger,
  isEmojiPickerOpen,
  onOpenEmojiPicker,
  clearActiveOptions,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ZoneHome'>;
  isMembersModalOpen: boolean;
  onOpenMembersModal: () => void;
  canShowMessenger: boolean;
  onToggleMessenger: () => void;
  isEmojiPickerOpen: boolean;
  onOpenEmojiPicker: () => void;
  clearActiveOptions: () => void;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(20)).current;
  const initialValues = { fadeAnim, translateAnim };

  const [isActiveOption, setIsActiveOption] = useState({
    code: false,
  });

  const toggleActiveOption = (
    option: 'code',
    value: boolean | undefined = undefined
  ) => {
    setIsActiveOption({
      ...isActiveOption,
      [option]: value ?? !isActiveOption[option],
    });
  };

  const copyCodeToClipboard = async () => {
    if (!zoneCode) return;
    await Clipboard.setStringAsync(zoneCode);
    console.log('copied to clipboard');
    Alert.alert('Code copied to clipboard');
  };

  const handleExitZone = () => {
    postToExitZone(map);
    navigation.navigate('Home', { deviceId: '123' });
  };

  useLayoutEffect(runMenuAnimation(initialValues), []);
  const map = useMapStore();
  const zoneCode = map.zone?.zoneId;

  const openChat = () => {
    toggleActiveOption('code', false);
    clearActiveOptions();
    navigation.navigate('Zone Chat');
  };
  return (
    <Animated.View
      style={{ opacity: fadeAnim, transform: [{ translateX: translateAnim }] }}
    >
      <Pressable
        style={[
          $pressable,
          {
            borderColor: isMembersModalOpen ? '#000000' : AppColors.success700,
          },
        ]}
        onPress={onOpenMembersModal}
      >
        <Ionicons name={'people'} size={22} color={'white'} />
      </Pressable>
      <Pressable
        style={[
          $pressable,
          {
            borderColor: isActiveOption.code ? '#000000' : AppColors.success700,
            position: 'relative',
            alignItems: 'center',
          },
        ]}
        onPress={toggleActiveOption.bind(null, 'code', undefined)}
      >
        <FontAwesome5
          name={'hashtag'}
          size={22}
          color={'white'}
          style={{ alignContent: 'center' }}
        />
        {isActiveOption.code && (
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              left: -160,
              alignItems: 'center',
              justifyContent: 'space-evenly',
              width: 150,
              padding: 10,
              bottom: -4,
              top: -4,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: AppColors.success700,
              backgroundColor: 'white',
            }}
          >
            <Text style={{ fontSize: 18 }}>{zoneCode}</Text>
            <Ionicons
              name={'copy-outline'}
              size={24}
              color={AppColors.success700}
              onPress={copyCodeToClipboard}
            />
          </View>
        )}
      </Pressable>
      <Pressable
        style={[
          $pressable,
          {
            //TODO: isEmojiModalOpen
            borderColor: isEmojiPickerOpen ? '#000000' : AppColors.success700,
          },
        ]}
        onPress={onOpenEmojiPicker}
      >
        <Entypo name={'emoji-happy'} size={22} color={'white'} />
      </Pressable>
      <Pressable style={$pressable} onPress={openChat}>
        <Entypo name={'chat'} size={22} color={'white'} />
      </Pressable>
      <Pressable
        style={[
          $pressable,
          {
            borderColor: canShowMessenger ? '#000000' : AppColors.success700,
          },
        ]}
        onPress={onToggleMessenger}
      >
        <Entypo name={'megaphone'} size={22} color={'white'} />
      </Pressable>
      <Pressable style={$pressable} onPress={handleExitZone}>
        <Ionicons
          name={'md-exit-outline'}
          size={22}
          color={'white'}
          style={{ transform: [{ rotate: '180deg' }] }}
        />
      </Pressable>
    </Animated.View>
  );
};

const $pressable: ViewStyle = {
  padding: 10,
  backgroundColor: AppColors.success700,
  borderRadius: 5,
  borderWidth: 4,
  borderColor: AppColors.success700,
  marginHorizontal: 10,
  marginVertical: 5,
};
