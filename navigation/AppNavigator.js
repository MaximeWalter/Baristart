import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import BottomNavigation from './BottomNavigation'; 
import { useAuth } from '../AuthContext'; 

const AppNavigator = () => {
  const { currentUser } = useAuth();

  return (
    <NavigationContainer>
      {currentUser ? <BottomNavigation /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;