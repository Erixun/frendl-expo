import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Text } from 'react-native';

type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen = ({ route, navigation }: SettingsScreenProps) => {
  return <Text>Settings Screen - Welcome</Text>;
};

export default SettingsScreen;