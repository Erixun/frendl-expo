import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRef, useLayoutEffect, createRef } from 'react';
import { Animated, Pressable } from 'react-native';
import { RootStackParamList } from '../navigators/AppNavigator';
import { AppColors } from '../theme/colors';

//TODO: move to separate file
export const MenuOptions = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ZoneHome'>;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(20)).current;
  const initialValues = { fadeAnim, translateAnim };

  useLayoutEffect(runMenuAnimation(initialValues), []);

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
        onPress={() => console.log('pressed')}
      >
        <Ionicons name={'text'} size={30} color={'white'} />
      </Pressable>
      <Pressable
        style={{
          padding: 10,
          backgroundColor: AppColors.success700,
          borderRadius: 5,
          margin: 10,
        }}
        onPress={() => console.log('pressed')}
      >
        <Ionicons name={'code'} size={30} color={'white'} />
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
        onPress={() => navigation.navigate('Home', { deviceId: '123' })}
      >
        <Ionicons name={'md-exit-outline'} size={30} color={'white'} />
      </Pressable>
    </Animated.View>
  );
};

const translateIn = (translateAnim: Animated.Value) => {
  Animated.timing(translateAnim, {
    toValue: 0,
    duration: 200,
    useNativeDriver: true,
  }).start();
};

const fadeIn = (fadeAnim: Animated.Value) => {
  // Will change fadeAnim value to 1 in 5 seconds
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 200,
    useNativeDriver: true,
  }).start();
};

const fadeOut = (fadeAnim: Animated.Value) => {
  // Will change fadeAnim value to 0 in 3 seconds
  Animated.timing(fadeAnim, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  }).start();
};

//TODO: move to separate file/utils?
const runMenuAnimation =
  ({
    translateAnim,
    fadeAnim,
  }: {
    translateAnim: Animated.Value;
    fadeAnim: Animated.Value;
  }) =>
  () => {
    translateIn(translateAnim);
    fadeIn(fadeAnim);
    return () => {
      fadeOut(fadeAnim);
    };
  };
