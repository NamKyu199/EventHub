import React from 'react'
import { ActivityIndicator, Image, ImageBackground } from 'react-native'
import { appImage } from '../utils/appImage'
import { appInfo } from '../constants/appInfos'
import { SpaceComponent } from '../components'
import { appColors } from '../constants/appColors'

const SplashScreen = () => {
    return (
        <ImageBackground
            source={appImage.SplashIMG}
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
            imageStyle={{ flex: 1 }}
        >
            <Image
                source={appImage.logo}
                style={{
                    width: appInfo.size.WIDTH * 0.7,
                    resizeMode: 'contain'
                }} />
            <SpaceComponent height={16} />
            <ActivityIndicator color={appColors.gray} size={22} />
        </ImageBackground>
    )
}

export default SplashScreen