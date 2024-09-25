import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ForgotPassword, LoginScreen, RegisterScreen, Verication } from '~screens';
import OnbroadingScreen from '~screens/auth/OnbroadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  const [isExistingUser, setIsExistingUser] = useState(false);

  useEffect(() => {
    checkUserExisting()
  }, [])

  const checkUserExisting = async () => {
    const res = await AsyncStorage.getItem('auth');

    res && setIsExistingUser(true);
  }

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      {
        !isExistingUser &&
        <Stack.Screen name='OnbroadingScreen' component={OnbroadingScreen} />
      }
      <Stack.Screen name='LoginScreen' component={LoginScreen} />
      <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
      <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
      <Stack.Screen name='Verication' component={Verication} />
    </Stack.Navigator>
  )
}

export default AuthNavigator