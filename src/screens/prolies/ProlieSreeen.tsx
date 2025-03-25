import { View, Text, Button } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, removeAuth } from '~redux/reducers/authReducer'
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage'

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  const { removeItem } = useAsyncStorage('auth');

  const handleLogout = async () => {
    await removeItem();  // Xóa dữ liệu trong AsyncStorage
    dispatch(removeAuth()); // ✅ Không cần truyền payload
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HomeScreen</Text>
      <Button title='Logout' onPress={handleLogout} />
    </View>
  )
}

export default ProfileScreen;
