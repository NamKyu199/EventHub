import { View, Text, StyleSheet, Platform, StatusBar, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { globalStyles } from '~styles/globalStyles';
import { Bookmark2, Calendar, Crown, Logout, Message2, MessageQuestion, Setting2, Sms, User } from 'iconsax-react-native';
import SpaceComponent from './SpaceComponent';
import { appImage } from '~constants/appImage';
import { appColors } from '~constants/appColors';
import { useDispatch } from 'react-redux';
import { removeAuth } from '~redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerCustom = ({ navigation }: any) => {

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
    try {
      await AsyncStorage.removeItem('auth'); // Xóa thông tin đăng nhập khỏi AsyncStorage
      dispatch(removeAuth()); // Reset Redux state
      navigation.replace('Login'); // Chuyển đến màn hình đăng nhập
    } catch (error) {
      console.error('❌ Lỗi khi đăng xuất:', error);
    }
  };

  return (
    <View style={[localStyles.container]}>
      <View>
        <Image source={appImage.UserLogo} style={{ width: 52, height: 52, borderRadius: 100, marginBottom: 12 }} />
        <TextComponent text='Hoàng Thành Nam' title size={18} />
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