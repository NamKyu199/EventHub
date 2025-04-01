import React, { useState, useEffect } from 'react';
import { ButtonComponent, ContainerComponent, InputComponent, SectionComponent, SpaceComponent, TextComponent } from '~components';
import { Sms } from 'iconsax-react-native';
import { appColors } from '~constants/appColors';
import LoadingModal from '~modals/LoadingModal';
import { authSelector, AuthState } from '~redux/reducers/authReducer';
import { useSelector } from 'react-redux';
import authenticationAPI from '~apis/authApi';

const NewPassword = ({ navigation, route }: any) => {
    const { email } = route.params || {};  // Đảm bảo email tồn tại trong route.params
    const auth: AuthState = useSelector(authSelector);
    const [isloading, setIsloading] = useState(false);
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');

    useEffect(() => {
        console.log('Received email:', email); // Kiểm tra email trong console
    }, [email]);

    const handleChangePassword = async () => {
        if (password !== checkPassword) {
            console.log("Mật khẩu không khớp");
            return;
        }
    
        try {
            setIsloading(true);
    
            const api = '/change-password';
            const body = {
                email: email || auth.email,  // Dùng email từ route params hoặc từ Redux store
                newPassword: password,        // Gửi mật khẩu mới
                repassword: checkPassword     // Gửi mật khẩu nhập lại
            };
    
            // Gửi yêu cầu API để thay đổi mật khẩu
            const res = await authenticationAPI.HandeleAuthentication(api, body, 'post');
    
            if (res?.data?.message) {
                console.log(res.data.message); // In thông báo từ API
                if (res.data.message === "Mật khẩu đã được thay đổi thành công") {
                    navigation.navigate('LoginScreen'); // Quay lại trang đăng nhập nếu mật khẩu thay đổi thành công
                }
            } else {
                console.log("Đã có lỗi khi thay đổi mật khẩu");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsloading(false);
        }
    };

    return (
        <ContainerComponent back isImageBackgroud isScroll>
            <SectionComponent>
                <TextComponent text='Đổi mật khẩu mới' title />
                <SpaceComponent height={24} />
                <InputComponent
                    value={password}
                    onChange={val => setPassword(val)}
                    placeholder='Nhập mật khẩu mới'
                    affix={
                        <Sms size={22} color={appColors.gray} />
                    }
                />
                <InputComponent
                    value={checkPassword}
                    onChange={val => setCheckPassword(val)}
                    placeholder='Nhập lại mật khẩu mới'
                    affix={
                        <Sms size={22} color={appColors.gray} />
                    }
                />
            </SectionComponent>
            <SectionComponent>
                <ButtonComponent
                    text={'Xác nhận'}
                    type='primary'
                    onPress={handleChangePassword}
                    disable={isloading}  // Vô hiệu hóa nút khi đang loading
                />
            </SectionComponent>
            <LoadingModal visible={isloading} />
        </ContainerComponent>
    )
}

export default NewPassword;