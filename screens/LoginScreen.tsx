import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Text,
  TextStyle,
  View,
  ViewStyle,
  Image,
} from 'react-native';
import { useState } from 'react';
import AppButton from '../components/AppButton';
import { AppColors } from '../theme/colors';
import { RootStackParamList } from '../navigators/AppNavigator';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen = ({ route, navigation }: LoginScreenProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleNameInputChange = (text: string) => {
    setUsername(text);
  };
  const handlePasswordInputChange = (text: string) => {
    setPassword(text);
  };

  const BankIDLogo = () => (
    <View style={{ height: 50, width: 50 }}>
      <Image
        style={{ height: '100%', width: '100%' }}
        source={require('../assets/logo/BankID_logo_white.png')}
      />
    </View>
  );

  return (
    <View style={$screen}>
      <Text style={$logoText}>Welcome to Frendl</Text>
      <Text style={$subText}>Where friends come to zone</Text>
      <AppButton
        label="Login with"
        rightAsset={<BankIDLogo />}
        style={$btnLogin}
        onPress={() => navigation.navigate('Home', { deviceId: '123' })}
      />
    </View>
  );
};

const $screen: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
};

const $logoText: TextStyle = {
  fontSize: 36,
  fontWeight: 'bold',
  textAlign: 'center',
  color: AppColors.success800,
};

const $subText: TextStyle = {
  fontSize: 20,
  textAlign: 'center',
};

const $infoText: TextStyle = {
  fontSize: 16,
  textAlign: 'center',
};

const $btnLogin: ViewStyle = {
  position: 'absolute',
  bottom: '10%',
  width: '80%',
  margin: 10,
};
