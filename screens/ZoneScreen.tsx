import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Text } from 'react-native';

type ZoneScreenProps = NativeStackScreenProps<RootStackParamList, 'Zone'>;

const ZoneScreen = ({ route, navigation }: ZoneScreenProps) => {
  return <Text>Zone Screen - Welcome</Text>;
};

export default ZoneScreen;