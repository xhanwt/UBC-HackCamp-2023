import React, {useState} from 'react';
import { View, Text, TextInput, Button } from  'react-native';
import authService from '../services/authServices';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const user = await authService.login(email, password);
      
            // Navigate to the next screen on successful login
            // You can replace 'NextScreen' with the name of your next screen
            navigation.navigate('UserProfile', { user });
          } catch (error) {
            // Handle login error
          }
    };
    

    return (
        <View>
            <Text>Login</Text>
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
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

export default LoginScreen;