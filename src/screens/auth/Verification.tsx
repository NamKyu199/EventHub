import { ArrowRight } from 'iconsax-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import authenticationAPI from '~apis/authApi';
import { ButtonComponent, ContainerComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '~components';
import { appColors } from '~constants/appColors';
import { fontFamililes } from '~constants/fontFamililes';
import { LoadingModal } from '~modals';
import { globalStyles } from '~styles/globalStyles';

const Verification = ({ navigation, route }: any) => {
  const { code = '', email = '', password = '', fullName = '' } = route.params || {};

  const [currentCode, setCurrentCode] = useState<string>(code);
  const [codeValues, setCodeValues] = useState<string[]>(['', '', '', '']);
  const [newCode, setNewCode] = useState('');
  const [limit, setLimit] = useState(30);
  const [isloading, setIsloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const refs = [useRef<any>(), useRef<any>(), useRef<any>(), useRef<any>()];

  useEffect(() => refs[0].current?.focus(), []);

  useEffect(() => {
    if (limit > 0) {
      const interval = setInterval(() => setLimit(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [limit]);

  useEffect(() => setNewCode(codeValues.join('')), [codeValues]);

  const handleChangeCode = (val: string, index: number) => {
    const newValues = [...codeValues];
    newValues[index] = val;
    setCodeValues(newValues);
    if (val && index < refs.length - 1) refs[index + 1].current.focus();
  };

  const handleResendVerification = async () => {
    setCodeValues(['', '', '', '']);
    setNewCode('');
    setIsloading(true);
    try {
      console.log('Gửi yêu cầu xác thực đến API...');
      const res: any = await authenticationAPI.HandeleAuthentication('/verification', { email, password, fullName }, 'post');
      console.log('Full API response:', res);
      const otp = res?.data?.otp;
      if (otp) {
        console.log('OTP nhận được:', otp);
        setCurrentCode(otp);
        setLimit(20);
      } else {
        console.warn('API không trả về mã xác thực!');
      }
    } catch (error: any) {
      console.error('Lỗi khi gọi API:', error.message);
    } finally {
      setIsloading(false);
    }
  };

  const handleVerification = async () => {
    if (limit === 0) {
      setErrorMessage('Hết thời gian xác minh, vui lòng gửi lại mã xác minh mới!');
      return;
    }
    if (newCode !== currentCode) {
      setErrorMessage('Mã không hợp lệ');
      return;
    }
    setErrorMessage('');
    try {
      const res: any = await authenticationAPI.HandeleAuthentication('/register', { email, password, fullName }, 'post');
      console.log('resRegister:', res);
      navigation.navigate('LoginScreen')
    } catch (error) {
      console.log('Lỗi không thể tạo người dùng', error);
    }
  };

  return (
    <ContainerComponent back isImageBackgroud isScroll>
      <SectionComponent>
        <TextComponent text='Xác minh' title />
        <SpaceComponent height={12} />
        <TextComponent
          text={`Chúng tôi đã gửi mã xác minh qua ${email ? email.replace(/.{1,8}/, '********') : 'email của bạn'}`}
        />
        <SpaceComponent height={27} />
        <RowComponent justify='space-between'>
          {codeValues.map((val, index) => (
            <TextInput
              key={index}
              keyboardType='number-pad'
              value={val}
              ref={refs[index]}
              style={styles.input}
              placeholder='-'
              maxLength={1}
              onChangeText={(text) => handleChangeCode(text, index)}
            />
          ))}
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={40} />
      <SectionComponent>
        <ButtonComponent
          disable={newCode.length !== 4}
          onPress={handleVerification}
          text='Xác nhận'
          type='primary'
          iconFlex='right'
          icon={
            <View style={[globalStyles.iconContainer, { backgroundColor: newCode.length !== 4 ? appColors.gray : appColors.primary }]}>  
              <ArrowRight size={20} color={appColors.white} />
            </View>
          }
        />
      </SectionComponent>
      <SectionComponent>
        {errorMessage && <TextComponent text={errorMessage} flex={0} styles={{ textAlign: 'center' }} color={appColors.danger} />}
      </SectionComponent>
      <SectionComponent>
        <RowComponent justify='center'>
          <TouchableOpacity onPress={limit === 0 ? handleResendVerification : undefined}>
            <TextComponent text='Gửi lại mã' flex={0} color={limit === 0 ? appColors.purple : appColors.gray} />
          </TouchableOpacity>
          <SpaceComponent width={5} />
          <TextComponent text={`00:${limit.toString().padStart(2, '0')}`} flex={0} color={appColors.link} />
        </RowComponent>
      </SectionComponent>
      <LoadingModal visible={isloading} />
    </ContainerComponent>
  );
};

export default Verification;

const styles = StyleSheet.create({
  input: {
    height: 55,
    width: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray2,
    fontSize: 24,
    fontFamily: fontFamililes.bold,
    textAlign: 'center',
  },
});
