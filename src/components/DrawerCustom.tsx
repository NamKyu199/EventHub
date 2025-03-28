import { View, Text, StyleSheet, Platform, StatusBar, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { globalStyles } from '~styles/globalStyles';
import { Bookmark2, Calendar, Crown, Logout, Message2, MessageQuestion, Setting2, Sms, User } from 'iconsax-react-native';
import SpaceComponent from './SpaceComponent';
import { appImage } from '~constants/appImage';
import { appColors } from '~constants/appColors';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, AuthState, removeAuth } from '~redux/reducers/authReducer';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { HandleNotification } from '~utils/handleNotification';
import { LoadingModal } from '~modals';

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
      icon: <User size={size} color={color} />,
    },
    {
      key: 'Message',
      title: 'Message',
      icon: <Message2 size={size} color={color} />,
    },
    {
      key: 'Calendar',
      title: 'Calendar',
      icon: <Calendar size={size} color={color} />,
    },
    {
      key: 'Bookmark',
      title: 'Bookmark',
      icon: <Bookmark2 size={size} color={color} />,
    },
    {
      key: 'ContactUs',
      title: 'Contact Us',
      icon: <Sms size={size} color={color} />,
    },
    {
      key: 'Settings',
      title: 'Settings',
      icon: <Setting2 size={size} color={color} />,
    },
    {
      key: 'HelpAndFAQs',
      title: 'Help & FAQs',
      icon: <MessageQuestion size={size} color={color} />,
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

  return (
    <View style={[localStyles.container]}>
      <View>
        <Image source={appImage.UserLogo} style={{ width: 52, height: 52, borderRadius: 100, marginBottom: 12 }} />
        <TextComponent text={auth.fullName || "Người dùng"}
          title size={18} />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={profileMenu}
        style={{ flex: 1, marginVertical: 20 }}
        renderItem={({ item, index }) => (
          <RowComponent
            styles={[localStyles.listItem]}
            onPress={
              item.key === 'SignOut'
                ? () => handleSignOut()
                : () => {
                  navigation.closeDrawer();
                }
            }>
            {item.icon}
            <TextComponent
              text={item.title}
              styles={localStyles.listItemText}
            />
          </RowComponent>
        )}
      />
      <RowComponent justify='flex-start'>
        <TouchableOpacity style={[globalStyles.button, { backgroundColor: '#00F8FF33', height: 'auto' }]}>
          <Crown
            size="22"
            color="#00F8FF"
          />
          <SpaceComponent width={8} />
          <TextComponent text='Nâng cấp Pro' color='#00F8FF' />
        </TouchableOpacity>
      </RowComponent>
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