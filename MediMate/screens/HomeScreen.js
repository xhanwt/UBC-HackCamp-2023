// HomeScreen.js
import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const HomeScreen = () => {
  const navigation = useNavigation();

  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const [isSignUpHovered, setIsSignUpHovered] = useState(false);

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleSignUpPress = () => {
    navigation.navigate('Signup');
  };



return (
    <View style={styles.container}>
      <Text style={styles.logoText}>MediMate</Text>

      <TouchableOpacity
        style={[styles.button, styles.loginButton, isLoginHovered && styles.loginHovered]}
        onPress={handleLoginPress}
        onMouseEnter={() => setIsLoginHovered(true)}
        onMouseLeave={() => setIsLoginHovered(false)}
      >
        <Button title="Login" onPress={handleLoginPress} style={[styles.buttonText, styles.loginText]}/>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.signUpButton, isSignUpHovered && styles.signUpHovered]}
        onPress={handleSignUpPress}
        onMouseEnter={() => setIsSignUpHovered(true)}
        onMouseLeave={() => setIsSignUpHovered(false)}
      >
        <Button title="Signup" onPress={handleSignUpPress} style={[styles.buttonText, styles.signUpText]}/>
      </TouchableOpacity>
    </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    marginBottom: 16,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    // Default text color for buttons
  },
  loginButton: {
    backgroundColor: '#3498db', // Default background color for Login button
    borderWidth: 1,
    borderColor: '#3498db', // Default border color for Login button
    borderRadius: 20,
  },
  signUpButton: {
    backgroundColor: 'white', // Default background color for Sign Up button
    borderWidth: 1,
    borderColor: '#3498db', // Default border color for Sign Up button
    // Default text color for Sign Up button
    borderRadius: 20,
  },
  loginHovered: {
    backgroundColor: '#2980b9', // Darker background color on hover for Login button
    borderColor: '#2980b9', // Darker border color on hover for Login button
  },
  signUpHovered: {
    backgroundColor: '#dcdcdc', // Darker background color on hover for Sign Up button
    borderColor: '#2980b9', // Darker border color on hover for Sign Up button
  },
  loginText: {
    color: 'white', // Text color for Login button
  },
  signUpText: {
    color: 'black', // Text color for Sign Up button
  },
});

export default HomeScreen;