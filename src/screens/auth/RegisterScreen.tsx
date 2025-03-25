import React, { useEffect, useState } from 'react';
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components';
import { Lock1, Sms, User } from 'iconsax-react-native';
import { fontFamililes } from '~constants/fontFamililes';
import { appColors } from '~constants/appColors';
import SocialLogin from './components/SocialLogin';
import { LoadingModal } from '~modals';
import authenticationAPI from '~apis/authApi';
import { Validate } from '~utils/validate';
import { useDispatch } from 'react-redux';
import { addAuth } from '~redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initValue = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const RegisterScreen = ({ navigation }: any) => {
    const [values, setValues] = useState(initValue);
    const [isloading, setIsloading] = useState(false);
    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const dispatch = useDispatch();

    useEffect(() => {
        setErrors({
            fullName: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    }, [values.fullName, values.email, values.password, values.confirmPassword]);

    const handleChangeValue = (key: string, value: string) => {
        const data: any = { ...values };
        data[key] = value;
        setValues(data);
    };

    const handleRegister = async () => {
        const { fullName, email, password, confirmPassword } = values;
        let formIsValid = true;

        let newErrors = {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        };

        if (!fullName) {
            formIsValid = false;
            newErrors.fullName = 'Vui lòng nhập họ và tên';
        } else if (!Validate.fullName(fullName)) {
            formIsValid = false;
            newErrors.fullName = 'Tên phải có ít nhất 10 ký tự và không chứa số hoặc ký tự đặc biệt';
        }

        if (!email) {
            formIsValid = false;
            newErrors.email = 'Vui lòng nhập email';
        } else if (!Validate.email(email)) {
            formIsValid = false;
            newErrors.email = 'Email không hợp lệ';
        }

        if (!password) {
            formIsValid = false;
            newErrors.password = 'Vui lòng nhập mật khẩu';
        } else if (!Validate.password(password)) {
            formIsValid = false;
            newErrors.password = 'Mật khẩu phải từ 8-15 ký tự và không được chứa dấu';
        }

        if (!confirmPassword) {
            formIsValid = false;
            newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
        } else if (password !== confirmPassword) {
            formIsValid = false;
            newErrors.confirmPassword = 'Mật khẩu không khớp';
        }

        setErrors(newErrors);

        if (!formIsValid) return;
        setIsloading(true);
        try {
            const res = await authenticationAPI.HandeleAuthentication(
                `/verification`,
                {
                    email: values.email,
                    password: values.password,
                    fullName:values.fullName,
                },
                'post',
            );
            console.log('API response:', res);
            // Kiểm tra dữ liệu trả về
            const otp = res?.data?.otp;
            if (otp) {
                console.log('OTP nhận được:', otp);
                navigation.navigate('Verification', {
                    code: otp,
                    ...values,
                });
            } else {
                console.log('Lỗi: API không trả về mã xác thực');
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        } finally {
            setIsloading(false);
        }
    };

    return (
        <>
            <ContainerComponent isImageBackgroud isScroll back>
                <SectionComponent>
                    <SpaceComponent height={10} />
                    <TextComponent size={24} text='Đăng ký' title font={fontFamililes.medium} />
                    <SpaceComponent height={20} />

                    {/* Full Name Input */}
                    <InputComponent
                        value={values.fullName}
                        onChange={val => handleChangeValue('fullName', val)}
                        placeholder='Nhập họ và tên'
                        affix={<User size={22} color={appColors.gray} />}
                    />
                    {errors.fullName && (
                        <TextComponent
                            text={errors.fullName}
                            color={appColors.danger}
                            styles={{
                                marginBottom: 10,
                                marginTop: -15,
                                marginLeft: 5
                            }}
                        />
                    )}
                    {/* Email Input */}
                    <InputComponent
                        value={values.email}
                        onChange={val => handleChangeValue('email', val)}
                        placeholder='Nhập Email'
                        affix={<Sms size={22} color={appColors.gray} />}
                    />
                    {errors.email && (
                        <TextComponent
                            text={errors.email}
                            color={appColors.danger}
                            styles={{
                                marginBottom: 10,
                                marginTop: -15,
                                marginLeft: 5
                            }}
                        />
                    )}

                    {/* Password Input */}
                    <InputComponent
                        value={values.password}
                        onChange={val => handleChangeValue('password', val)}
                        placeholder='Nhập mật khẩu'
                        isPassword
                        affix={<Lock1 size={22} color={appColors.gray} />}
                    />
                    {errors.password && (
                        <TextComponent
                            text={errors.password}
                            color={appColors.danger}
                            styles={{
                                marginBottom: 10,
                                marginTop: -15,
                                marginLeft: 5
                            }}
                        />
                    )}

                    {/* Confirm Password Input */}
                    <InputComponent
                        value={values.confirmPassword}
                        onChange={val => handleChangeValue('confirmPassword', val)}
                        placeholder='Nhập lại mật khẩu'
                        isPassword
                        affix={<Lock1 size={22} color={appColors.gray} />}
                    />
                    {errors.confirmPassword && (
                        <TextComponent
                            text={errors.confirmPassword}
                            color={appColors.danger}
                            styles={{
                                marginBottom: 10,
                                marginTop: -15,
                                marginLeft: 5
                            }}
                        />
                    )}
                </SectionComponent>

                <SectionComponent>
                    <ButtonComponent
                        onPress={handleRegister}
                        text={'Đăng ký'}
                        type='primary'
                        disable={
                            !values.fullName ||
                            !values.email ||
                            !values.password ||
                            !values.confirmPassword ||
                            !!errors.fullName ||
                            !!errors.email ||
                            !!errors.password ||
                            !!errors.confirmPassword
                        }
                    />
                </SectionComponent>

                <SocialLogin />

                <SectionComponent>
                    <RowComponent justify='center'>
                        <TextComponent text={'Bạn đã có tài khoản?'} />
                        <SpaceComponent width={5} />
                        <ButtonComponent type='link' text='Đăng nhập' onPress={() => navigation.navigate('LoginScreen')} />
                    </RowComponent>
                </SectionComponent>
            </ContainerComponent>

            <LoadingModal visible={isloading} />
        </>
    );
};

export default RegisterScreen;
