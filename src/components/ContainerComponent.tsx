import { View, Text, ImageBackground, ScrollView, SafeAreaView, Platform, StatusBar } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../styles/globalStyles';
import { appImage } from '../utils/appImage';

interface Props {
    isImageBackgroud?: boolean,
    isScroll?: boolean,
    title?: string,
    children: ReactNode,
}

const ContainerComponent = (props: Props) => {
    const { isImageBackgroud, isScroll, title, children } = props;

    const returnContainer = isScroll ? (
        <ScrollView style={{ flex: 1 }}>{children}</ScrollView>
    ) : (
        <View style={{ flex: 1 }}>{children}</View>
    );
    return isImageBackgroud ? (
        <ImageBackground
            source={appImage.SplashIMG}
            style={{ flex: 1 }}
            imageStyle={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                {returnContainer}
            </SafeAreaView>
        </ImageBackground>
    ) : (
        <SafeAreaView style={[globalStyles.container, {
            flex: 1,
            //  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
        }]}>
            <View>{returnContainer}</View>
        </SafeAreaView>
    );
};

export default ContainerComponent