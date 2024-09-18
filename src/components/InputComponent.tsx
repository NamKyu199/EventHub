import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardType } from 'react-native'
import React, { ReactNode, useState } from 'react'
import { EyeSlash } from 'iconsax-react-native';
import { appColors } from '../constants/appColors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { appInfo } from '../constants/appInfos';
import { globalStyles } from '../styles/globalStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

interface Props {
    value: string,
    onChange: (val: string) => void,
    affix?: ReactNode,
    placeholder?: string,
    suffix?: ReactNode,
    isPassword?: boolean,
    type?: KeyboardType,
}

const InputComponent = (props: Props) => {
    const { value, onChange, affix, placeholder, suffix, type, isPassword } = props;
    const [isShowPassword, setIsShowPassword] = useState(isPassword) ?? false;

    return (
        <View style={styles.inputcontainer}>
            {affix ?? affix}
            <TextInput
                placeholder={placeholder ?? ''}
                onChangeText={val => onChange(val)}
                secureTextEntry={isShowPassword}
                value={value}
                style={[styles.input, globalStyles.text]}
                placeholderTextColor='#747688'
                keyboardType={type ?? 'default'}
            />
            {suffix ?? suffix}
            <TouchableOpacity
                onPress={
                    isPassword ? () => setIsShowPassword(!isShowPassword) : () => onChange('')
                }>
                {isPassword ? (
                    <FontAwesome
                        name={isShowPassword ? 'eye-slash' : 'eye'}
                        size={22}
                        color={appColors.gray} />
                ) : (
                    value.length > 0 && (
                        <AntDesign name='close' size={22} color={appColors.text} />
                    )
                )}
            </TouchableOpacity>
        </View>
    )
}

export default InputComponent

const styles = StyleSheet.create({
    inputcontainer: {
        flexDirection: 'row',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: appColors.gray3,
        width:'100%',
        minHeight: 56,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: appColors.white,
        marginBottom: 19,
    },
    input: {
        padding: 0,
        margin: 0,
        flex: 1,
        paddingHorizontal: 14,
        color: appColors.text,
        letterSpacing: 1
    }
})