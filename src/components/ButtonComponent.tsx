import {
    View,
    Text,
    StyleProp,
    ViewStyle,
    TextStyle,
    TouchableOpacity,
} from 'react-native';
import React, { ReactNode } from 'react';
import { TextComponent } from '.';
import { globalStyles } from '../styles/globalStyles';
import { appColors } from '../constants/appColors';
import { fontFamililes } from '../constants/fontFamililes';

interface Props {
    icon?: ReactNode;
    text: string;
    type?: 'primary' | 'text' | 'link';
    color?: string;
    styles?: StyleProp<ViewStyle>;
    textColor?: string;
    textStyles?: StyleProp<TextStyle>;
    textFont?: string;
    onPress?: () => void;
    iconFlex?: 'right' | 'left';
    disable?: boolean;
}

const ButtonComponent = (props: Props) => {
    const {
        icon,
        text,
        textColor,
        textStyles,
        textFont,
        color,
        styles,
        onPress,
        iconFlex,
        type,
        disable,
    } = props;

    return type === 'primary' ? (
        <TouchableOpacity
            disabled={disable}
            onPress={onPress}
            style={[
                globalStyles.button,
                {
                    backgroundColor: color ?? appColors.primary,
                },
                styles,
            ]}>
            {icon && icon}
            <TextComponent
                text={text}
                color={textColor ?? appColors.white}
                styles={[
                    textStyles,
                    {
                        marginLeft: icon ? 12 : 0,
                        fontSize: 16,
                        textAlign: 'center',
                    },
                ]}
                flex={icon && iconFlex === 'right' ? 1 : 0}
                font={textFont ?? fontFamililes.medium}
            />
            {icon && iconFlex === 'right' && icon}
        </TouchableOpacity>
    ) : (
        <TouchableOpacity onPress={onPress}>
            <TextComponent
                flex={0}
                text={text}
                color={type === 'link' ? appColors.primary : appColors.text}
            />
        </TouchableOpacity>
    );
};

export default ButtonComponent;