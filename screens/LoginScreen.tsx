import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Text, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import Button from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import { useState } from 'react';
import AppButton from '../components/AppButton';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ route, navigation }: LoginScreenProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleNameInputChange = (text: string) => {
    setUsername(text);
  };
  const handlePasswordInputChange = (text: string) => {
    setPassword(text);
  };
  return (
    <View style={$screen}>
      <Text style={$logoText}>Welcome Frendl</Text>
      <Text style={$infoText}>Token: {route.params?.token}</Text>
      <Text style={$infoText}>Device ID: {route.params?.deviceId}</Text>
      {/* TEXT INPUT HERE */}
      <AppTextInput value={username} onChangeText={handleNameInputChange} />
      <AppTextInput
        value={password}
        textContentType="password"
        secureTextEntry={true}
        onChangeText={handlePasswordInputChange}
      />
      <AppButton
        label="Login"
        onPress={() => navigation.navigate('Home', { deviceId: '123' })}
      />

      <AppButton
        label="Login with BankID"
        onPress={() => navigation.navigate('Home', { deviceId: '123' })}
      />

      <AppButton
        label="Login with Freja eID"
        onPress={() => navigation.navigate('Home', { deviceId: '123' })}
      />
    </View>
  );
};

export default LoginScreen;

const $screen: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

const $logoText: TextStyle = {
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center',
};

const $infoText: TextStyle = {
  fontSize: 16,
  textAlign: 'center',
};
