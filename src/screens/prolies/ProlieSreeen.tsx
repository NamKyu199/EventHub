import { Text } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, AuthState, removeAuth } from '~redux/reducers/authReducer'
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { HandleNotification } from '~utils/handleNotification'
import { LoadingModal } from '~modals'
import { ButtonComponent, ContainerComponent, TextComponent } from '~components'

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const auth: AuthState = useSelector(authSelector);
  const { removeItem } = useAsyncStorage('auth');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {

    setIsLoading(true)

    const fcmtoken = await AsyncStorage.getItem('fcmtoken');

    if (fcmtoken) {
      if (auth.fcmTokens && auth.fcmTokens.length > 0) {
        const items = [...auth.fcmTokens]
        const index = auth.fcmTokens.findIndex(element => element === fcmtoken)

        if (index !== -1) {
          items.splice(index, 1)
        }

        await HandleNotification.Update(auth.id, items)
      }
    }
    await removeItem();
    dispatch(removeAuth());
    setIsLoading(false)
  };

  return (
    <ContainerComponent back>
      <TextComponent text='ProfileScreen' />
      <ButtonComponent text='Logout' onPress={handleLogout} type='primary' />
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  )
}

export default ProfileScreen;
