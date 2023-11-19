import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // You can use any icon library you prefer
import UserProfileScreen from './UserProfileScreen';
import MedicationSearchScreen from './MedicationSearch';

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="MedicationSearch"
        component={MedicationSearchScreen}
        options={{
          tabBarLabel: 'Pill Tracker',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabBar;