import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View, ViewStyle } from 'react-native';
import AppButton from '../components/AppButton';
import { useLayoutEffect, useState } from 'react';
import AppTextInput from '../components/AppTextInput';
import { AppColors } from '../theme/colors';
import { RootStackParamList } from '../navigators/AppNavigator';

type ZoneSetupScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ZoneSetup'
>;

export const ZoneSetupScreen = ({
  route,
  navigation,
}: ZoneSetupScreenProps) => {
  useLayoutEffect(() => {
    navigation.setOptions({ title: `Zone Setup` });
  }, [navigation]);

  const [code, setCode] = useState('');

  const handleCodeInputChange = (text: string) => {
    setCode(text.toUpperCase());
  };

  return (
    <View style={$screen}>
      <View
        style={{
          maxWidth: 200,
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Text
          style={{
            position: 'absolute',
            top: -20,
            left: 0,
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          Zone Code
        </Text>
        <AppTextInput
          style={{
            borderRadius: 50,
            borderBottomRightRadius: 0,
            marginHorizontal: 0,
            borderTopRightRadius: 0,
            borderWidth: 1,
            borderRightWidth: 0,
            elevation: 0,
            textAlign: 'center',
            width: 150,
            fontSize: 18,
          }}
          maxLength={9}
          value={code}
          onChangeText={handleCodeInputChange}
        />
        <AppButton
          label="Enter"
          size="sm"
          style={{
            backgroundColor: AppColors.success800,
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
            marginHorizontal: 0,
          }}
          onPress={() => navigation.navigate('Zone', { zoneId: code })}
        />
      </View>
      <Text style={{ fontSize: 16 }}>OR</Text>
      <AppButton
        label="Create your own"
        onPress={() => navigation.navigate('Zone', { zoneId: code })}
      />
    </View>
  );
};

const $screen: ViewStyle = {
  flex: 1,
  gap: 20,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
};
