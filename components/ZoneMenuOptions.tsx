import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRef, useLayoutEffect, createRef, useState } from 'react';
import { Animated, Pressable, View, Text, Alert } from 'react-native';
import { RootStackParamList } from '../navigators/AppNavigator';
import { AppColors } from '../theme/colors';
import { useMapStore } from '../store/mapStore';
import * as Clipboard from 'expo-clipboard';
import { postToExitZone } from '../services/ws';
import { runMenuAnimation } from '../utils/runMenuAnimation';

export const MenuOptions = ({
  navigation,
  onOpenMembersModal,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ZoneHome'>;
  onOpenMembersModal: () => void;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(20)).current;
  const initialValues = { fadeAnim, translateAnim };

  const [showCode, setShowCode] = useState(false);

  const toggleShowCode = () => {
    setShowCode(!showCode);
  };

  const copyCodeToClipboard = async () => {
    if (!zoneCode) return;
    await Clipboard.setStringAsync(zoneCode);
    console.log('copied to clipboard');
    Alert.alert('Copied to clipboard');
  };

  const handleExitZone = () => {
    postToExitZone(map);
    navigation.navigate('Home', { deviceId: '123' });
  };

  useLayoutEffect(runMenuAnimation(initialValues), []);
  const map = useMapStore();
  const zoneCode = map.zone?.zoneId;
  return (
    <Animated.View
      style={{ opacity: fadeAnim, transform: [{ translateX: translateAnim }] }}
    >
      <Pressable
        style={{
          padding: 10,
          backgroundColor: AppColors.success700,
          borderRadius: 5,
          margin: 10,
        }}
        onPress={onOpenMembersModal}
      >
        <Ionicons name={'people'} size={30} color={'white'} />
      </Pressable>
      <Pressable
        style={{
          padding: 10,
          backgroundColor: AppColors.success700,
          borderRadius: 5,
          margin: 10,
          position: 'relative',
        }}
        onPress={toggleShowCode}
      >
        <Ionicons name={'code'} size={30} color={'white'} />
        {showCode && (
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              left: -155,
              alignItems: 'center',
              justifyContent: 'space-evenly',
              width: 150,
              padding: 10,
              bottom: 0,
              top: 0,
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
        style={{
          padding: 10,
          backgroundColor: AppColors.success700,
          borderRadius: 5,
          margin: 10,
        }}
        onPress={() => navigation.navigate('Zone Chat')}
      >
        <Ionicons name={'chatbox-outline'} size={30} color={'white'} />
      </Pressable>
      <Pressable
        style={{
          padding: 10,
          backgroundColor: AppColors.success700,
          borderRadius: 5,
          margin: 10,
        }}
        onPress={handleExitZone}
      >
        <Ionicons
          name={'md-exit-outline'}
          size={30}
          color={'white'}
          style={{ transform: [{ rotate: '180deg' }] }}
        />
      </Pressable>
    </Animated.View>
  );
};

// const translateIn = (translateAnim: Animated.Value) => {
//   Animated.timing(translateAnim, {
//     toValue: 0,
//     duration: 200,
//     useNativeDriver: true,
//   }).start();
// };

// const fadeIn = (fadeAnim: Animated.Value) => {
//   // Will change fadeAnim value to 1 in 5 seconds
//   Animated.timing(fadeAnim, {
//     toValue: 1,
//     duration: 200,
//     useNativeDriver: true,
//   }).start();
// };

// const fadeOut = (fadeAnim: Animated.Value) => {
//   // Will change fadeAnim value to 0 in 3 seconds
//   Animated.timing(fadeAnim, {
//     toValue: 0,
//     duration: 300,
//     useNativeDriver: true,
//   }).start();
// };

// //TODO: move to separate file/utils?
// const runMenuAnimation =
//   ({
//     translateAnim,
//     fadeAnim,
//   }: {
//     translateAnim: Animated.Value;
//     fadeAnim: Animated.Value;
//   }) =>
//   () => {
//     translateIn(translateAnim);
//     fadeIn(fadeAnim);
//     return () => {
//       fadeOut(fadeAnim);
//     };
//   };
