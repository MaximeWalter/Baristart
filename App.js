// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { initializeApp, getApps } from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase/firebaseConfig';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from './AuthContext'; 
import firestore from '@react-native-firebase/firestore';


if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
