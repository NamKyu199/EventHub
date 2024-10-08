import { View, Text, StyleProp, TextStyle } from 'react-native'
import React from 'react'
import { appColors } from '../constants/appColors'
import { fontFamililes } from '../constants/fontFamililes'
import { globalStyles } from '../styles/globalStyles'

interface Props {
    text: string,
    color?: string,
    size?: number,
    flex?: number,
    font?: string,
    styles?: StyleProp<TextStyle>,
    title?: boolean,
}

const TextComponent = (props: Props) => {

    const { text, color, size, flex, font, title, styles } = props

    return <Text style={[
        globalStyles.text,
        {
            color: color ?? appColors.text,
            flex: flex ?? 0,
            fontSize: size ? size : title ? 24 : 14,
            fontFamily: font
                ? font
                : title
                ? fontFamililes.medium
                : fontFamililes.regular,
        },
        styles,
    ]}>{text}</Text>
}

export default TextComponent