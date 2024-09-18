import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { globalStyles } from '../../styles/globalStyles'
import { ButtonComponent, InputComponent } from '../../components'
import { Lock1, Sms } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={[
      globalStyles.container,
      {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
      },
    ]}>
      <InputComponent
        value={email}
        onChange={val => setEmail(val)}
        placeholder='Nhập Email'
        affix={<Sms size={22} color={appColors.gray} />}
      />
      <InputComponent
        value={password}
        onChange={val => setPassword(val)}
        placeholder='Nhập mật khẩu'
        isPassword
        affix={<Lock1 size={22} color={appColors.gray} />}
      />
      {/* <ButtonComponent
        text='LOGIN'
        onPress={() => console.log('Login')}
        type='link'
        icon={
          <View>
            <Text>N</Text>
          </View>
        }
      /> */}
    </View>
  )
}

export default LoginScreen