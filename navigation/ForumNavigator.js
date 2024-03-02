import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ForumPage from '../pages/ForumPage'; 
import NewsFeedPage from '../pages/NewsFeedPage'; 
import TopicsPage from '../pages/TopicsPage';
import InformationPage from '../pages/InformationPage';
import UtilityPage from '../pages/UtilityPage';

const ForumStack = createStackNavigator();

const ForumNavigator = () => (
    <ForumStack.Navigator screenOptions={{ headerShown: false }}>
      <ForumStack.Screen name="ForumMain" component={ForumPage} />
      <ForumStack.Screen name="NewsFeed" component={NewsFeedPage} />
      <ForumStack.Screen name="Topics" component={TopicsPage} />
      <ForumStack.Screen name="Information" component={InformationPage} />
      <ForumStack.Screen name="Utility" component={UtilityPage} />
    </ForumStack.Navigator>
  );
  

export default ForumNavigator;
