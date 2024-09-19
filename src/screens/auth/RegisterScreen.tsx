import { View, Text, Button, Image, Switch } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { Lock1, Sms, User } from 'iconsax-react-native'
import { appImage } from '~utils/appImage'
import { fontFamililes } from '~constants/fontFamililes'
import { appColors } from '~constants/appColors'
import SocialLogin from './components/SocialLogin'

const initValue = {
    fullName: '',
    email: '',
    password: '',
    confimPassword: '',
};

const RegisterScreen = ({ navigation }: any) => {

    const [values, setValues] = useState(initValue);

    const handleChangeValue = (key: string, value: string) => {
        const data: any = { ...values }

        data[`${key}`] = value;

        setValues(data);
    };

    return (
        <ContainerComponent isImageBackgroud isScroll back>
            <SectionComponent>
                <SpaceComponent height={10} />
                <TextComponent size={24} text='Đăng ký' title font={fontFamililes.medium} />
                <SpaceComponent height={20} />
                <InputComponent
                    value={values.fullName}
                    onChange={val => handleChangeValue('fullName', val)}
                    placeholder='Nhập họ và tên'
                    affix={
                        <User size={22} color={appColors.gray} />
                    }
                />
                <InputComponent
                    value={values.email}
                    onChange={val => handleChangeValue('email', val)}
                    placeholder='Nhập Email'
                    affix={
                        <Sms size={22} color={appColors.gray} />
                    }
                />
                <InputComponent
                    value={values.password}
                    onChange={val => handleChangeValue('password', val)}
                    placeholder='Nhập mật khẩu'
                    isPassword
                    affix={
                        <Lock1 size={22} color={appColors.gray} />
                    }
                />
                <InputComponent
                    value={values.confimPassword}
                    onChange={val => handleChangeValue('confimPassword', val)}
                    placeholder='Nhập lại mật khẩu'
                    isPassword
                    affix={
                        <Lock1 size={22} color={appColors.gray} />
                    }
                />
            </SectionComponent>
            <SectionComponent>
                <ButtonComponent text={'Đăng ký'} type='primary' />
            </SectionComponent>
            <SocialLogin />
            <SectionComponent>
                <RowComponent justifly='center'>
                    <TextComponent text={'Bạn đã có tài khoản?'} />
                    <SpaceComponent width={5} />
                    <ButtonComponent type='link' text='Đăng nhập' onPress={() => navigation.navigate('LoginScreen')} />
                </RowComponent>
            </SectionComponent>
        </ContainerComponent>
    )
}

export default RegisterScreen