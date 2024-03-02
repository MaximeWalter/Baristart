import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert  } from 'react-native';
import { getApps } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase/firebaseConfig';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!getApps().length) {
      app;
    }
  }, []);

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Login Success', 'You have successfully logged in!');
      navigation.navigate('FreeVersionPage'); 
    } catch (error) {
      Alert.alert('Login Failed', error.message); 
      console.error('Error logging in:', error.message);
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate('Signup'); 
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToSignUp} style={styles.signupButton}>
        <Text style={styles.signupText}>Not a member yet ? Join now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingBottom: 20, 
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'darkblue',
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 16,
    marginBottom: 20,
    padding: 10,
    color:'black',
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: 'darkblue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10, 
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signupButton: {
    
  },
  signupText: {
    color: '#0000ff',
    textDecorationLine: 'underline', 
  },
});

export default LoginPage;
