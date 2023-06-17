import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { RootStackParamList } from '../navigators/AppNavigator';

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export const ProfileScreen = ({ route, navigation }: ProfileScreenProps) => {
  return <Text>Profile Screen - Welcome</Text>;
};
