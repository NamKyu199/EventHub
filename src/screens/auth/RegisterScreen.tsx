import React, { useEffect, useState } from 'react'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { Lock1, Sms, User } from 'iconsax-react-native'
import { fontFamililes } from '~constants/fontFamililes'
import { appColors } from '~constants/appColors'
import SocialLogin from './components/SocialLogin'
import { LoadingModal } from '~modals'
import authenticationAPI from '~apis/authApi'
import { Validate } from '~utils/validate'
import { useDispatch } from 'react-redux'
import { addAuth } from '~redux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initValue = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const RegisterScreen = ({ navigation }: any) => {
    const [values, setValues] = useState(initValue);
    const [isloading, setIsloading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (values.fullName || values.email || values.password || values.confirmPassword) {
            setErrorMessage('');
        }
    }, [values.fullName, values.email, values.password, values.confirmPassword])

    const handleChangeValue = (key: string, value: string) => {
        const data: any = { ...values }

        data[`${key}`] = value;

        setValues(data);
    };

    const handleRegister = async () => {
        const { fullName, email, password, confirmPassword } = values;
        const emailValidation = Validate.email(email);

        if (emailValidation) {
            if (fullName && email && password && confirmPassword) {
                setIsloading(true)
                try {
                    const res = await authenticationAPI.HandeleAuthentication(
                        '/register',
                        {
                            fullName: values.fullName,
                            email: values.email,
                            password: values.password,
                        },
                        'post')
                    dispatch(addAuth(res.data));
                    await AsyncStorage.setItem('auth',JSON.stringify(res.data))
                    setIsloading(false)
                }
                catch (error: any) {
                    console.log(error, 'Lỗi đăng ký');
                    setIsloading(false)
                }
            }
            else {
                setErrorMessage('Vui lòng nhập đầy đủ thông tin')
            }
        }
        else {
            setErrorMessage('Email not correct!!!')
        }
    }

    return (
        <>
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
                        value={values.confirmPassword}
                        onChange={val => handleChangeValue('confirmPassword', val)}
                        placeholder='Nhập lại mật khẩu'
                        isPassword
                        affix={
                            <Lock1 size={22} color={appColors.gray} />
                        }
                    />
                    {errorMessage && (
                        <TextComponent text={errorMessage} color={appColors.danger} />
                    )}
                </SectionComponent>
                <SectionComponent>
                    <ButtonComponent onPress={handleRegister} text={'Đăng ký'} type='primary' />
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
            <LoadingModal visible={isloading} />
        </>

    )
}

export default RegisterScreen