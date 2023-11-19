
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Image } from 'react-native';
import authService from '../services/authServices';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const user = await authService.login(email, password);
      navigation.navigate('UserProfile', { user });
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error);
    }
  };

  return (
    <ImageBackground
    source={{ uri: 'https://cdn.discordapp.com/attachments/1174136321959268424/1175870605699072030/Untitled_design_3.png?ex=656ccdd7&is=655a58d7&hm=f13030c697377b53ef6058b9007fa20917de75822b838f6e916ac4d38dd825d6&' }}
    style={styles.backgroundImage}
    >
    <View style={styles.container}>
      {/* Welcome Back Text */}
      <Text style={styles.title}>Welcome Back</Text>
      
      {/* Logo Image */}
      <Image
        source={{ uri: 'https://cdn.discordapp.com/attachments/1174136321959268424/1175866106716635196/Untitled_design_2.png?ex=656cc9a6&is=655a54a6&hm=33be75876ce17cb6536b9ea3cb45b57538626ad4209ebbdd13d7a8d6e2bcf671&' }} // Replace with the actual URL or local path of your logo image
        style={styles.logo}
      />
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
      <Button title="Login" onPress={handleLogin} />
    </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch' for different cover options
      justifyContent: 'center', // Center children vertically
    },
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 16,
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
      color: 'black', // Adjust text color to be visible on the background
    },
    logo: {
      width: 100, // Set the width of your logo
      height: 100, // Set the height of your logo
      marginBottom: 16,
    },
    input: {
      height: 40,
      width: '100%',
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      paddingLeft: 8,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Add a semi-transparent white background for better readability
    },
  });

export default LoginScreen;