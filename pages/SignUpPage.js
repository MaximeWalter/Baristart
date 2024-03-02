import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Switch, ActivityIndicator, Image } from 'react-native';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import firebaseConfig from '../firebase/firebaseConfig'; 

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const latteArtBackground = { uri: '../assets/Background/LatteArt.jpg' };

const SignupPage = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBarista, setIsBarista] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    setLoading(true);
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const currentDate = new Date();
      const registrationDate = currentDate.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
      const db = getFirestore();
      await setDoc(doc(db, "(default)", user.uid), {
        firstName,
        lastName,
        username,
        age,
        country,
        email,
        isBarista,
        registrationDate,
      });
      navigation.navigate('Login');
    } catch (error) {
      setError(error.message);
      console.error('Error signing up:', error.message);
    } finally {
      setLoading(false);
    }
  };


  const navigateToLogin = () => {
    navigation.navigate('Login'); 
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
      <View style={styles.imageContainer}>
        <Image source={latteArtBackground} style={styles.latteArtBackground} />
      </View>
       <TextInput placeholder="First Name" value={firstName} onChangeText={setFirstName} style={styles.input} />
       <TextInput placeholder="Last Name" value={lastName} onChangeText={setLastName} style={styles.input} />
       <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input}/>
       <TextInput placeholder="Age" value={age} onChangeText={setAge} style={styles.input} keyboardType="numeric" />
       <TextInput placeholder="Country" value={country} onChangeText={setCountry} style={styles.input} />
       <TextInput placeholder="Mail" value={email} onChangeText={setEmail} style={styles.input} />
       <TextInput placeholder="Password" value={password} secureTextEntry={true} onChangeText={setPassword} style={styles.input} />
       <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Register as a Barista</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isBarista ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={setIsBarista}
          value={isBarista}
          style={styles.switch}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToLogin} style={styles.loginButton}>
            <Text style={styles.loginText}>Already have an account ? Log in</Text>
          </TouchableOpacity>
        </>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingBottom: 20,
  },
  imageContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  latteArtBackground: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'darkblue',
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 16,
    marginBottom: 15,
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
  loginButton: {
    marginTop: 15,
  },
  loginText: {
    color: 'darkblue',
    textDecorationLine: 'underline',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchLabel: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SignupPage;
