import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DrawerNavigator from './DrawerNavigator';
import { CategoryDetail, EventDetail, ExploreEvents, PaymentScreen, ProfileScreen, SearchEvents } from '~screens';


const MainNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={DrawerNavigator} />
      <Stack.Screen name="EventDetail" component={EventDetail} />
      <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
      <Stack.Screen name='ExploreEvents' component={ExploreEvents} />
      <Stack.Screen name='SearchEvents' component={SearchEvents} />
      <Stack.Screen name='CategoryDetail' component={CategoryDetail} />
      <Stack.Screen name='PaymentScreen' component={PaymentScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;