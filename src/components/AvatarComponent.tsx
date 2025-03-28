import { View, Text, StyleProp, ViewStyle, TouchableOpacity, Image, TextStyle, ImageProps } from 'react-native'
import React from 'react'
import appImage from '~constants/appImage';
import { appColors } from '~constants/appColors';
import TextComponent from './TextComponent';
import { globalStyles } from '~styles/globalStyles';
import { fontFamililes } from '~constants/fontFamililes';

interface Props {
    photoURL?: string,
    name: string,
    styles?: StyleProp<ImageProps>;
    size?: number,
    onPress?: () => void
}

const AvatarComponent = (props: Props) => {
    const { photoURL, name, styles, size, onPress } = props;
    return (
        <TouchableOpacity disabled={!onPress} onPress={onPress}>
            {photoURL ? (
                <Image
                    source={{ uri: photoURL }}
                    style={[
                        {
                            width: size ?? 52,
                            height: size ?? 52,
                            borderRadius: 100,
                            borderWidth: 1,
                            borderColor: appColors.white,
                        },
                        styles,
                    ]}
                />
            ) : (
                <View
                    style={[
                        globalStyles.center,
                        {
                            width: size ?? 52,
                            height: size ?? 52,
                            borderRadius: 100,
                            borderWidth: 1,
                            borderColor: appColors.white,
                            backgroundColor: appColors.gray2
                        },
                    ]}
                >
                    <TextComponent
                        text={name.charAt(0).toUpperCase()}
                        font={fontFamililes.bold}
                        color={appColors.white}
                        size={size ? size / 3 : 14}
                    />
                </View>
            )}
        </TouchableOpacity>
    );
};

export default AvatarComponent