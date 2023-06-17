import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRef, useLayoutEffect } from "react";
import { Animated, Pressable } from "react-native";
import { RootStackParamList } from "../navigators/AppNavigator";
import { AppColors } from "../theme/colors";

//TODO: move to separate file
export const MenuOptions = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Zone'>;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(20)).current;

  const translateIn = () => {
    Animated.timing(translateAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useLayoutEffect(() => {
    translateIn();
    fadeIn();
    return () => {
      fadeOut();
    };
  }, []);

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
        onPress={() => navigation.navigate('Home', { deviceId: '123' })}
      >
        <Ionicons name={'md-exit-outline'} size={30} color={'white'} />
      </Pressable>
    </Animated.View>
  );
};