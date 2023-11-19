import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';
import AuthService from '../services/authServices';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [healthCardNumber, setHealthCardNumber] = useState('');
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const genders = ['Male', 'Female', 'Other']; // Add or modify as needed

  const handleSignup = async () => {
    try {
      await AuthService.signup(email, password, name, gender, healthCardNumber);

      // If signup is successful, navigate to the login screen
      navigation.navigate('Login');
    } catch (error) {
      // Handle signup error
    }
  };

  const handlePickerChange = (itemValue) => {
    setGender(itemValue);
    setIsOtherSelected(itemValue === 'Other');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Mate!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Gender</Text>
        {isOtherSelected ? (
          <TextInput
            style={styles.input}
            placeholder="Other (Please type)"
            onChangeText={(text) => setGender(text)}
          />
        ) : (
          <Picker
            selectedValue={gender}
            onValueChange={handlePickerChange}
            style={styles.picker}
          >
            {genders.map((item, index) => (
              <Picker.Item label={item} value={item} key={index} />
            ))}
          </Picker>
        )}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Health Card Number"
        value={healthCardNumber}
        onChangeText={(text) => setHealthCardNumber(text)}
      />
      <Button title="Signup" onPress={handleSignup} style={styles.signupButton} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F0F8FF', // Lighter blue background
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#2F4F4F', // Dark slate gray text color
    textTransform: 'uppercase',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#A9A9A9', // Dark gray border color
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 16,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    color: '#2F4F4F',
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 16,
  },
  pickerLabel: {
    marginBottom: 8,
    fontSize: 16,
    color: '#2F4F4F',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  picker: {
    height: 40,
    width: '100%',
    borderColor: '#A9A9A9',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
    color: '#2F4F4F',
  },
  signupButton: {
    height: 40,
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#008080', // Teal button color
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textTransform: 'uppercase',
  },
});

export default SignupScreen;