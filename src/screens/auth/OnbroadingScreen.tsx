import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import Swiper from 'react-native-swiper'
import { appImage } from '../../utils/appImage'
import { appInfo } from '../../constants/appInfos'
import { appColors } from '../../constants/appColors'
import { TextComponent } from '../../components'
import { fontFamililes } from '../../constants/fontFamililes'

const OnbroadingScreen = ({ navigation }: any) => {

    const [index, setIndex] = useState(0);

    return (
        <View style={[globalStyles.container]}>
            <Swiper
                style={{}}
                loop={false}
                onIndexChanged={num => setIndex(num)}
                index={index}
                activeDotColor={appColors.white}
            >
                <Image source={appImage.Onbroading1}
                    style={{
                        flex: 1,
                        width: appInfo.size.WIDTH,
                        height: appInfo.size.HEIGHT,
                        resizeMode: 'contain'
                    }} />
                <Image source={appImage.Onbroading2}
                    style={{
                        flex: 1,
                        width: appInfo.size.WIDTH,
                        height: appInfo.size.HEIGHT,
                        resizeMode: 'contain'
                    }} />
                <Image source={appImage.Onbroading3}
                    style={{
                        flex: 1,
                        width: appInfo.size.WIDTH,
                        height: appInfo.size.HEIGHT,
                        resizeMode: 'contain'
                    }} />
            </Swiper>
            <View style={{
                paddingHorizontal: 20,
                paddingVertical: 20,
                position: 'absolute',
                bottom: 0,
                right: 0,
                left: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <TextComponent text='Ship' color={appColors.gray2} font={fontFamililes.medium}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => index < 2 ? setIndex(index + 1) : navigation.navigate('LoginScreen')} >
                    <TextComponent text='Next' color={appColors.white} font={fontFamililes.medium}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OnbroadingScreen

const styles = StyleSheet.create({
    text: {
        color: appColors.white,
        fontSize: 20,
        fontWeight: '500'
    }
})