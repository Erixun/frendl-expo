import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { RootStackParamList } from '../navigators/AppNavigator';

type SettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Settings'
>;

export const SettingsScreen = ({ route, navigation }: SettingsScreenProps) => {
  return <Text>Settings Screen - Welcome</Text>;
};
