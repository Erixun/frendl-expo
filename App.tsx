import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import ZoneScreen from './screens/ZoneScreen';
import { NavigationContainer } from '@react-navigation/native';
import { Colors, headerColor, screenColor } from './theme/colors';

export type RootStackParamList = {
  Home: { deviceId: string };
  Profile: { userId: string };
  Login: { token: string; deviceId: string };
  Zone: { zoneId: string };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
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
        options={{ headerShown: false,
          contentStyle: {
            backgroundColor: Colors.info300,
          },
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Zone" component={ZoneScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
