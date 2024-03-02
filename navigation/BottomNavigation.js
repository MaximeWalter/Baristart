import React from 'react';  //I used to put it deirectly in the "App.js" page, so maybe some stuffs are going to change now
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import ProfilePage from '../pages/ProfilePage';
import ShopPage from '../pages/ShopPage';
import HomePage from '../pages/HomePage';
import ForumNavigator from '../navigation/ForumNavigator';  // Ajustez le chemin d'accès

const Tab = createBottomTabNavigator();

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'Profile':
      iconName = '👤'; 
      break;
    case 'Shop':
      iconName = '🛒';
      break;
    case 'Newsletter':
      iconName = '📬';
      break;
    case 'Home': 
      iconName = '🏠';
      break;
    case 'Forum': 
      iconName = '🌍'; 
      break;
    default:
      iconName = '❓';
  }

  return {
    tabBarIcon: ({ focused, color, size }) => (
      <Text style={{ fontSize: size, color: color, textAlign: 'center' }}>
        {iconName}
      </Text>
    ),
    tabBarLabel: ({ focused, color }) => (
      <Text style={{ color: color, textAlign: 'center', fontSize: 10 }}>
        {route.name}
      </Text>
    ),
  };
};

function BottomNavigation() {
  return (
      <Tab.Navigator screenOptions={({  route }) => ({ ... screenOptions(route), headerShown: false,})}>
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Shop" component={ShopPage} />
        <Tab.Screen name="Forum" component={ForumNavigator} /> 
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
  );
}

export default BottomNavigation;
