import React, {useState} from 'react';
import { View, Text, TextInput, Button } from  'react-native';

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
        <View style={styles.container}>
            {/* Logo image */}
            <Image
                source={require('./path-to-your-logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.title}>Login</Text>

            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />

            <Button title="Login" onPress={handleLogin} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
});

export default LoginScreen;