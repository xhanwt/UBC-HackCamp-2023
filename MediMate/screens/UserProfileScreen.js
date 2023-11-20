import React, {useState} from 'react';
import { View, Text, TextInput, Button } from  'react-native';
import authService from '../services/authServices';
import BottomTabNavigator from './BottomTabNavigator';

const UserProfileScreen = () => {
    return (
        <View>
          <BottomTabNavigator />
        </View>
    );
};

export default UserProfileScreen;