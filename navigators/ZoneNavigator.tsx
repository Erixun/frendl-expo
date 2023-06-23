import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { RootStackParamList } from './AppNavigator';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { ZoneChatScreen, ZoneScreen, ZoneSetupScreen } from '../screens';
import { screenColor, headerColor, AppColors } from '../theme/colors';


const Stack = createNativeStackNavigator<RootStackParamList>();
type ZoneStackProps = NativeStackScreenProps<RootStackParamList, 'Zone'>;

const ZoneNavigator: FC<ZoneStackProps> = ({ route, navigation }) => {
  const { zoneId } = route.params;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: screenColor,
        },
        headerStyle: {
          backgroundColor: headerColor,
        },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen
        name="ZoneHome"
        component={ZoneScreen}
        initialParams={{ zoneId: zoneId }}
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: AppColors.neutral100,
          },
        }}
      />
      <Stack.Screen
        name="Zone Chat"
        component={ZoneChatScreen}
        options={{
          headerShown: true,
          contentStyle: {
            backgroundColor: AppColors.neutral100,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default ZoneNavigator;
