import { View, Text, Button, Image, Switch } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { Lock1, Sms } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'
import { appImage } from '../../utils/appImage'
import SocialLogin from './components/SocialLogin'
import { fontFamililes } from '../../constants/fontFamililes'

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);

  return (
    <ContainerComponent isImageBackgroud isScroll>
      <SectionComponent styles={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 75
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
        <RowComponent justifly='space-between'>
          <RowComponent onPress={() => setIsRemember(!isRemember)}>
            <Switch
              trackColor={{ true: appColors.primary }}
              thumbColor={appColors.white}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}

            />
            <TextComponent text='Lưu mật khẩu' />
          </RowComponent>
          <ButtonComponent
            text={'Quên mật khẩu?'}
            onPress={() => { }}
            type='text'
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent text={'Đăng nhập'} type='primary' />
      </SectionComponent>
      <SocialLogin />
      <SectionComponent>
        <RowComponent justifly='center'>
          <TextComponent text={'Bạn chưa có tài khoản?'} />
          <ButtonComponent type='link' text='Đăng ký' />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  )
}

export default LoginScreen