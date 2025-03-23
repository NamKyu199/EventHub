import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import appImage from '~constants/appImage'
import { globalStyles } from '~styles/globalStyles'

const MakerCustom = () => {
    return (
        <ImageBackground
            source={appImage.MarkerBg}
            style={[globalStyles.shadow,
            {
                width: 56,
                height: 56,
                justifyContent: 'center',
                alignItems: 'center'
            }
            ]}
            resizeMode='contain'
        >
            <Text style={{ color: 'white', fontSize: 12 }}>Food</Text>
        </ImageBackground>
    )
}

export default MakerCustom