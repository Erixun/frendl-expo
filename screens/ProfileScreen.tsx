import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Text } from 'react-native';

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen = ({ route, navigation }: ProfileScreenProps) => {
  return <Text>Profile Screen - Welcome</Text>;
};

export default ProfileScreen;