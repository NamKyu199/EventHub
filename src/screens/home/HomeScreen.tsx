import { View, Text, Button } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, removeAuth } from '~redux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = () => {
  const dispatch = useDispatch();

  const auth = useSelector(authSelector)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HomeScreen</Text>
      <Button title='Logout' onPress={async () => {
        await AsyncStorage.setItem('auth', auth.email)
        dispatch(removeAuth({}))
      }} />
    </View>
  )
}

export default HomeScreen