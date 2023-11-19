// HomeScreen.js
import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const navigateToSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View>
      <Button title="Login" onPress={navigateToLogin} />
      <Button title="Signup" onPress={navigateToSignup} />
    </View>
  );
};

export default HomeScreen;