import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, ContainerComponent, InputComponent, SectionComponent, SpaceComponent, TextComponent } from '~components'
import { Sms } from 'iconsax-react-native';
import { appColors } from '~constants/appColors';

const ForgotPassword = ({ navigation }: any) => {

    const [email, setEmail] = useState('');

    const handleForgotPassword = () => {
        navigation.navigate('NewPassword', { email });
    };

    return (
        <ContainerComponent back isImageBackgroud isScroll>
            <SectionComponent>
                <TextComponent text='Lấy lại mật khẩu' title />
                <SpaceComponent height={12} />
                <TextComponent text='Vui lòng nhập địa chỉ email của bạn để yêu cầu đặt lại mật khẩu' />
                <SpaceComponent height={26} />
                <InputComponent
                    value={email}
                    onChange={val => setEmail(val)}
                    placeholder='Nhập Email'
                    affix={
                        <Sms size={22} color={appColors.gray} />
                    }
                />
            </SectionComponent>
            <SectionComponent>
                <ButtonComponent
                    text={'Gửi'}
                    type='primary'
                    onPress={handleForgotPassword}
                />
            </SectionComponent>
        </ContainerComponent>
    )
}

export default ForgotPassword