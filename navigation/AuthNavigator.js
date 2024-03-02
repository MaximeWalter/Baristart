import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupPage from '../pages/SignUpPage';
import LoginPage from '../pages/LoginPage';

const Stack = createStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Signup" component={SignupPage} />
    </Stack.Navigator>
  );
  
  export default AuthNavigator;