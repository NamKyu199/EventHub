import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ForgotPassword, LoginScreen, RegisterScreen, Verication } from '~screens';
import OnbroadingScreen from '~screens/auth/OnbroadingScreen';

const AuthNavigator = () => {

  const Stack = createNativeStackNavigator();

  return <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen name='OnbroadingScreen' component={OnbroadingScreen} />
    <Stack.Screen name='LoginScreen' component={LoginScreen} />
    <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
    <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
    <Stack.Screen name='Verication' component={Verication} />
  </Stack.Navigator>
}

export default AuthNavigator