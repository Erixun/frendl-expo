import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import AppButton from '../components/AppButton';
import { useLayoutEffect, useState } from 'react';
import AppTextInput from '../components/AppTextInput';
import { AppColors } from '../theme/colors';
import { RootStackParamList } from '../navigators/AppNavigator';
import { useMapStore } from '../store/mapStore';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { postToCreateZone, postToEnterZone } from '../services/ws';
import { createZone } from '../store/zoneStore';

type ZoneSetupScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ZoneSetup'
>;

export const ZoneSetupScreen = observer(
  ({ route, navigation }: ZoneSetupScreenProps) => {
    useLayoutEffect(() => {
      navigation.setOptions({ title: `Zone Setup` });
    }, [navigation]);

    const [code, setCode] = useState('');

    const handleCodeInputChange = (text: string) => {
      setCode(text.toUpperCase());
    };

    const handleEnterZone = async () => {
      const map = useMapStore();
      map.zoneId = code;
      console.log('zoneId was', map.zoneId);
      console.log('code is', code);
      // runInAction(() => {
      // });
      await postToEnterZone(code)
        .then((res) => {
          console.log('res', res);
          map.zoneId = code;
          map.zone = createZone(map, res);
          // map.initZone();
          navigation.navigate('Zone', { zoneId: code });
        })
        .catch((err) => {
          console.error(err.message);
        });
    };

    const handleCreateZone = async () => {
      const map = useMapStore();
      postToCreateZone()
        .then((res) => {
          console.log('res', res);
          map.zoneId = res.zoneId;
          map.zone = createZone(map, res);
          navigation.navigate('Zone', { zoneId: res.zoneId });
        })
        .catch((err) => {
          console.error(err.message);
        });
    };

    return (
      <KeyboardAvoidingView
        style={$screen}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* <View style={$screen}> */}
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
            onPress={handleEnterZone}
          />
        </View>
        <View>
          <Text style={{ fontSize: 16 }}>OR</Text>
        </View>
        <AppButton label="Create your own" onPress={handleCreateZone} />
        {/* </View> */}
      </KeyboardAvoidingView>
    );
  }
);

const $screen: ViewStyle = {
  flex: 1,
  gap: 20,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
};
