// BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserProfileScreen from './UserProfileScreen';
import MedicationSearchScreen from './MedicationSearch';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="UserProfile" component={UserProfileScreen} />
      <Tab.Screen name="MedicationSearch" component={MedicationSearchScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;