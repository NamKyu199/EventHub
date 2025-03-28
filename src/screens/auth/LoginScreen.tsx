import { Alert, Image, Switch } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { Lock1, Sms } from 'iconsax-react-native'
import { appColors } from '~constants/appColors'
import { fontFamililes } from '~constants/fontFamililes'
import { appImage } from '~constants/appImage'
import SocialLogin from './components/SocialLogin'
import authenticationAPI from '~apis/authApi'
import { Validate } from '~utils/validate'
import { useDispatch } from 'react-redux'
import { addAuth } from '~redux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);

  const handleLogin = async () => {
    const emailValidation = Validate.email(email);
    if (emailValidation) {
      try {
        const res = await authenticationAPI.HandeleAuthentication(
          '/login',
          { email, password },
          'post'
        );

        // ✅ Lấy đầy đủ thông tin từ API
        const userData = {
          id: res.data.id,
          email: res.data.email,
          fullName: res.data.fullName, // ✅ Đảm bảo fullName được lấy
          accesstoken: res.data.accesstoken,
          follow_events: res.data.follow_events || [],
          photo: res.data.photo,
        };

        // ✅ Đưa vào Redux Store
        dispatch(addAuth(userData));

        // ✅ Lưu AsyncStorage
        const authData = isRemember
          ? JSON.stringify(userData)
          : JSON.stringify({ email: email, accesstoken: res.data.accesstoken });

        await AsyncStorage.setItem('auth', authData);
      } catch (error: any) {
        console.log('Error Response:', error.response?.data);
      }
    }
  };


  return (
    <ContainerComponent isImageBackgroud isScroll>
      <SectionComponent styles={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30
      }}>
        <Image
          source={appImage.logo_text}
          style={{
            width: 162,
            height: 114,
            marginBottom: 30
          }}
        />
      </SectionComponent>
      <SectionComponent>
        <TextComponent size={24} text='Đăng nhập' title font={fontFamililes.medium} />
        <SpaceComponent height={21} />
        <InputComponent
          value={email}
          onChange={val => setEmail(val)}
          placeholder='Nhập Email'
          affix={
            <Sms size={22} color={appColors.gray} />
          }
        />
        <InputComponent
          value={password}
          onChange={val => setPassword(val)}
          placeholder='Nhập mật khẩu'
          isPassword
          affix={
            <Lock1 size={22} color={appColors.gray} />
          }
        />
        <RowComponent justify='space-between'>
          <RowComponent onPress={() => setIsRemember(!isRemember)}>
            <Switch
              trackColor={{ true: appColors.primary }}
              thumbColor={appColors.white}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}

            />
            <SpaceComponent width={5} />
            <TextComponent text='Lưu mật khẩu' />
          </RowComponent>
          <ButtonComponent
            text={'Quên mật khẩu?'}
            onPress={() => navigation.navigate('ForgotPassword')}
            type='text'
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent >
        <ButtonComponent onPress={handleLogin} text={'Đăng nhập'} type='primary' />
      </SectionComponent>
      <SocialLogin />
      <SectionComponent>
        <RowComponent justify='center'>
          <TextComponent text={'Bạn chưa có tài khoản?'} />
          <SpaceComponent width={5} />
          <ButtonComponent type='link' text='Đăng ký' onPress={() => navigation.navigate('RegisterScreen')} />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  )
}

export default LoginScreen