import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigators/AppNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable, TextStyle, ViewStyle } from 'react-native';
import { AppColors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { ProfileScreen, SettingsScreen, ZoneSetupScreen } from '.';
import React from 'react';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Tab = createBottomTabNavigator<RootStackParamList>();

export const HomeScreen = ({ route, navigation }: HomeScreenProps) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => (
          <Pressable
            style={{ marginRight: 10, transform: [{ rotate: '180deg' }] }}
            onPress={() =>
              navigation.navigate('Login', { token: '123', deviceId: '123' })
            }
          >
            <Ionicons
              name={'log-out-sharp'}
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
    </Tab.Navigator>
  );
};
