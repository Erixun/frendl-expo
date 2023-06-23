import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../App';
import { Pressable, Text, TextStyle, View, ViewStyle } from 'react-native';
import { AppColors, buttonPrimaryColor } from '../theme/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ProfileScreen, SettingsScreen, ZoneSetupScreen } from '../screens';
import { RootStackParamList } from './AppNavigator';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Tab = createBottomTabNavigator<RootStackParamList>();

const HomeTabNavigator = ({ route, navigation }: HomeScreenProps) => {
  return (
    <Tab.Navigator
      screenOptions={{
        // add a button to the header
        headerRight: () => (
          <Pressable
            style={{ marginRight: 10, transform: [{ rotate: '180deg' }] }}
            // style={({ pressed }) => (pressed ? [$buttonPressed] : [$button])}
            onPress={() =>
              navigation.navigate('Login', { token: '123', deviceId: '123' })
            }
          >
            {/* <Text style={$buttonText}>Logout</Text> */}
            <Ionicons
              name={'log-out-outline'}
              size={24}
              color={AppColors.neutral600}
            />
          </Pressable>
        ),
      }}
    >
      <Tab.Screen
        name="ZoneSetup"
        component={ZoneSetupScreen}
        options={{
          title: 'Zone',
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name={'map'} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name={'person'} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name={'settings'} size={size} color={color} />;
          },
        }}
      />

      {/* 
          <View style={$screen}>
            <View style={$heading}>
              <Text style={$title}>Welcome to Frendl</Text>
            </View>
            <Pressable
              style={({ pressed }) => (pressed ? [$buttonPressed] : [$button])}
              onPress={() => navigation.navigate('Profile', { userId: '123' })}
            >
              <Text style={$buttonText}>Go to Profile</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => (pressed ? [$buttonPressed] : [$button])}
              onPress={() => navigation.navigate('Login', { token: '123' })}
              >
              <Text style={$buttonText}>Go to Login</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => (pressed ? [$buttonPressed] : [$button])}
              onPress={() => navigation.navigate('Zone', { zoneId: '123' })}
              >
              <Text style={$buttonText}>Go to Zone</Text>
            </Pressable>
          </View> */}
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;

const $screen: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};
const $heading: ViewStyle = {
  padding: 10,
  // backgroundColor: 'lightblue',
  justifyContent: 'center',
  margin: 10,
};
const $title: TextStyle = {
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center',
};
// const $button: ViewStyle = {
//   width: 150,
//   padding: 10,
//   backgroundColor: buttonPrimaryColor,
//   borderRadius: 5,
//   elevation: 4,
//   // backgroundColor: 'lightgray',
//   margin: 10,
// };
// const $buttonPressed: ViewStyle[] = [
//   $button,
//   { backgroundColor: Colors.neutral900 },
// ];
// const $buttonText: TextStyle = {
//   color: 'white',
//   fontSize: 18,
//   textAlign: 'center',
// };
