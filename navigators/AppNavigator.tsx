import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, ZoneScreen } from '../screens';
import { AppColors, headerColor, screenColor } from '../theme/colors';
import HomeTabNavigator from './HomeTabNavigator';
import ZoneNavigator from './ZoneNavigator';

const StackName = {
  LOGIN: 'Login',
  HOME: 'Home',
  ZONE: 'Zone',
  ZONE_SETUP: 'ZoneSetup',
  ZONE_HOME: 'ZoneHome',
  ZONE_CHAT: 'Zone Chat',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
};

export type RootStackParamList = {
  Login: { token: string; deviceId: string };
  Home: { deviceId: string };
  ZoneSetup: { zoneId: string };
  Zone: { zoneId: string };
  ZoneHome: { zoneId: string };
  'Zone Chat': undefined;
  Profile: { userId: string };
  Settings: undefined;
};

//TODO: move to navigators folder & rename
const Stack = createNativeStackNavigator<RootStackParamList>();
const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
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
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: AppColors.info200,
          },
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Zone"
        component={ZoneNavigator}
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: screenColor,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
