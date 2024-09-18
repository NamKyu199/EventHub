import { View, Image, TouchableOpacity } from 'react-native'
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
    const swiperRef = React.useRef<any>(null); // Create a ref for the Swiper component

    return (
        <View style={[globalStyles.container]}>
            <Swiper
                ref={swiperRef} // Assign the ref to Swiper
                loop={false}
                onIndexChanged={num => setIndex(num)}
                index={index}
                activeDotColor={appColors.white}
                scrollEnabled={true} // Allow smooth swiping
                autoplay={false} // Disable automatic transition
                showsPagination={true}
                removeClippedSubviews={false} // Ensure better performance
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
                <TouchableOpacity onPress={() => {
                    if (index > 0) {
                        swiperRef.current.scrollBy(-1, true); // Go to the previous slide with animation
                    }
                }}>
                    <TextComponent text='Ship' color={appColors.gray2} font={fontFamililes.medium}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    if (index < 2) {
                        swiperRef.current.scrollBy(1, true); // Go to the next slide with animation
                    } else {
                        navigation.navigate('LoginScreen'); // Navigate to LoginScreen on the last slide
                    }
                }}>
                    <TextComponent text='Next' color={appColors.white} font={fontFamililes.medium}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OnbroadingScreen;