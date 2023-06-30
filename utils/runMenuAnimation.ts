import { Animated } from 'react-native';


const runMenuAnimation =
({ translateAnim, fadeAnim }: MenuAnimationParams) =>
() => {
  translateIn(translateAnim);
  fadeIn(fadeAnim);
  return () => {
    fadeOut(fadeAnim);
  };
};

const translateIn = (translateAnim: Animated.Value) => {
  Animated.timing(translateAnim, {
    toValue: 0,
    duration: 200,
    useNativeDriver: true,
  }).start();
};

const fadeIn = (fadeAnim: Animated.Value) => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 200,
    useNativeDriver: true,
  }).start();
};

const fadeOut = (fadeAnim: Animated.Value) => {
  Animated.timing(fadeAnim, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  }).start();
};

type MenuAnimationParams = {
  translateAnim: Animated.Value;
  fadeAnim: Animated.Value;
};

export { runMenuAnimation };
