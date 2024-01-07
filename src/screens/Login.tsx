import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { loginUser, registerUser } from '../app'; // Import your API functions

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, password });
      console.log('Login Response:', response); // Check response here
      // Handle successful login, navigate to another screen, set authentication state, etc.
    } catch (error) {
      console.error('Login Error:', error); // Log any error
      Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
    }
  };

  const handleRegister = async () => {
    try {
      const userData = { email, password };
      const response = await registerUser(userData);
      console.log('Register Response:', response); // Check response here
      // Handle successful registration
    } catch (error) {
      console.error('Registration Error:', error); // Log any error
      Alert.alert('Registration Failed', 'Failed to register. Please try again.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default Login;
