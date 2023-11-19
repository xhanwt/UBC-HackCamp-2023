//SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AuthService from '../services/authServices';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [healthCardNumber, setHealthCardNumber] = useState('');

  const handleSignup = async () => {
    try {
      await AuthService.signup(email, password, name, gender, healthCardNumber);

      // If signup is successful, navigate to the login screen
      navigation.navigate('Login');
    } catch (error) {
      // Handle signup error
    }
  };

  return (
    <View>
      <Text>Signup</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder="Gender"
        value={gender}
        onChangeText={(text) => setGender(text)}
      />
      <TextInput
        placeholder="Health Card Number"
        value={healthCardNumber}
        onChangeText={(text) => setHealthCardNumber(text)}
      />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

export default SignupScreen;