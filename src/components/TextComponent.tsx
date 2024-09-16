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

    const { text, color, size, flex, font, title } = props

    return <Text style={[
        globalStyles.text,
        {
            color: color ?? appColors.text,
            flex: flex ?? 0,
            fontSize: size ?? title ? 24 : 14,
            fontFamily: font ?? title ? fontFamililes.bold : fontFamililes.regular,
        }
    ]}>{text}</Text>
}

export default TextComponent