import { View, StyleSheet, Platform, StatusBar, FlatList } from 'react-native'
import React, { useState } from 'react'
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { Bookmark2, Logout } from 'iconsax-react-native';
import SpaceComponent from './SpaceComponent';
import { appColors } from '~constants/appColors';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, AuthState, removeAuth } from '~redux/reducers/authReducer';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { HandleNotification } from '~utils/handleNotification';
import { LoadingModal } from '~modals';
import AvatarComponent from './AvatarComponent';

const DrawerCustom = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const auth: AuthState = useSelector(authSelector);
  const { removeItem } = useAsyncStorage('auth');
  const size = 20;
  const color = appColors.gray;
  const profileMenu = [
    {
      key: 'MyProfile',
      title: 'My Profile',
      icon: <Bookmark2 size={size} color={color} />
    },
    {
      key: 'SignOut',
      title: 'Sign Out',
      icon: <Logout size={size} color={color} />,
    },
  ];

  const dispatch = useDispatch();

  const handleSignOut = async () => {

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

  const handleNavigation = (key: string) => {
    switch (key) {
      case 'SignOut':
        handleSignOut();
        break;
      case 'MyProfile':
        navigation.navigate('ProfileScreen', {
          screen: 'ProfileScreen'
        })
      default:
        console.log(key)
        break;
    }
    navigation.closeDrawer();
  }

  return (
    <View style={[localStyles.container]}>
      <AvatarComponent
        photoURL={auth.photo}
        name={auth.fullName ? auth.fullName : auth.email}
        size={52}
      />
      <SpaceComponent height={8} />
      <TextComponent text={auth.fullName ? auth.fullName : auth.email} title size={18} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={profileMenu}
        style={{ flex: 1, marginVertical: 20 }}
        renderItem={({ item, index }) => (
          <RowComponent
            styles={[localStyles.listItem]}
            onPress={() => handleNavigation(item.key)}
          >
            {item.icon}
            <TextComponent
              text={item.title}
              styles={localStyles.listItemText}
            />
          </RowComponent>
        )}
      />
      <LoadingModal visible={isLoading} />
    </View>
  )
}



export default DrawerCustom;
const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingVertical: Platform.OS === 'android' ? StatusBar.currentHeight : 48,
  },
  listItemText: {
    paddingLeft: 12,
  },
  listItem: {
    paddingVertical: 12,
    justifyContent: 'flex-start',
  },
})