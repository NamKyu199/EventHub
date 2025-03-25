import { View, Text, ImageBackground, Touchable, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import appImage from '~constants/appImage'
import { globalStyles } from '~styles/globalStyles'
import TextComponent from './TextComponent'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ArtMaker, Food, FoodMaker, MusicMaker, SportMaker } from '~constants/svg'


interface Props {
    type: string
}

const MakerCustom = (props: Props) => {

    const { type } = props;
    const renderIcon = (type: string) => {
        let icon;
        switch (type) {
            case 'sport':
                icon = <SportMaker style={{ width: 24, height: 24 }}  />;
                break;
            case 'art':
                icon = <ArtMaker style={{ width: 24, height: 24 }}  />;
                break;
            case 'food':
                icon = <FoodMaker style={{ width: 24, height: 24 }}  />;
                break;
            default:
                icon =
                    <MusicMaker style={{ width: 24, height: 24 }}  />;
                break;
        }
        return icon;
    };

    return (
        <ImageBackground
            source={appImage.MarkerBg}
            style={[globalStyles.shadow,
            {
                width: 46,
                height: 46,
                justifyContent: 'center',
                alignItems: 'center',
            }
            ]}
            resizeMode='contain'
        >
            {renderIcon(type)}
        </ImageBackground>
    )
}

export default MakerCustom