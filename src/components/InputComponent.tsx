import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardType, StyleProp, ViewStyle } from 'react-native'
import React, { ReactNode, useState } from 'react'
import { appColors } from '../constants/appColors';
import { globalStyles } from '../styles/globalStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
    value: string,
    onChange: (val: string) => void,
    affix?: ReactNode,
    placeholder?: string,
    suffix?: ReactNode,
    isPassword?: boolean,
    type?: KeyboardType,
    onEnd?: () => void,
    multiline?: boolean,
    numberOfLines?: number,
    styles?: StyleProp<ViewStyle>;
    allowClear?: boolean;
}

const InputComponent = (props: Props) => {
    const { value, allowClear, onChange, affix, placeholder, suffix, type, isPassword, onEnd, multiline, numberOfLines, styles } = props;
    const [isShowPassword, setIsShowPassword] = useState(isPassword) ?? false;

    return (
        <View style={[globalStyles.inputcontainer,
        {
            alignItems: multiline ? 'flex-start' : 'center'
        },
            styles,
        ]}>
            {affix ?? affix}
            <TextInput
                style={[globalStyles.input, globalStyles.text, { paddingHorizontal: affix || suffix ? 14 : 0 }]}
                value={value}
                placeholder={placeholder ?? ''}
                onChangeText={val => onChange(val)}
                secureTextEntry={isShowPassword}
                placeholderTextColor='#747688'
                keyboardType={type ?? 'default'}
                autoCapitalize='none'
                onEndEditing={onEnd}
                multiline={multiline}
                numberOfLines={numberOfLines}
            />
            {suffix ?? suffix}
            <TouchableOpacity
                onPress={
                    isPassword ? () => setIsShowPassword(!isShowPassword) : () => onChange('')
                }>
                {isPassword ? (
                    <TouchableOpacity onPress={() => setIsShowPassword(!isShowPassword)}>
                        <FontAwesome
                            name={isShowPassword ? 'eye-slash' : 'eye'}
                            size={22}
                            color={appColors.gray}
                        />
                    </TouchableOpacity>
                ) : (
                    allowClear && value.length > 0 && (
                        <TouchableOpacity
                            onPress={() => onChange('')}
                            style={{}}
                        >
                            <AntDesign name='close' size={22} color={appColors.text} />
                        </TouchableOpacity>
                    )
                )}
            </TouchableOpacity>
        </View>
    )
}

export default InputComponent