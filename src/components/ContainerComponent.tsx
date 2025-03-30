import { View, Text, ImageBackground, ScrollView, SafeAreaView, Platform, StatusBar, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { appImage } from '~constants/appImage';
import { globalStyles } from '~styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import RowComponent from './RowComponent';
import ButtonComponent from './ButtonComponent';
import { ArrowLeft } from 'iconsax-react-native';
import { appColors } from '~constants/appColors';
import TextComponent from './TextComponent';
import { fontFamililes } from '~constants/fontFamililes';

interface Props {
    isImageBackgroud?: boolean,
    isScroll?: boolean,
    title?: string,
    children: ReactNode,
    back?: boolean,
    right?: ReactNode,
}

const ContainerComponent = (props: Props) => {
    const { isImageBackgroud, isScroll, title, children, back, right } = props;

    const navigation: any = useNavigation();

    const headerComponent = () => {
        return (
            <View style={{ flex: 1, paddingTop: 40 }}>
                {(title || back || right) && (
                    <RowComponent
                        styles={{
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            minWidth: 48,
                            minHeight: 48,
                        }}
                    >
                        {back && (
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{
                                    marginRight: 12,
                                    flex: title ? undefined : 1, // ✅ Chỉ thêm flex: 1 khi không có title
                                }}
                            >
                                <ArrowLeft
                                    size="24"
                                    color={appColors.text}
                                />
                            </TouchableOpacity>
                        )}
                        {title ? (
                            <TextComponent
                                text={title}
                                size={16}
                                font={fontFamililes.medium}
                                flex={1}
                            />
                        ) : (
                            <></>
                        )}
                        {right && right}
                    </RowComponent>
                )}
                {returnContainer}
            </View>
        );
    };


    const returnContainer = isScroll ? (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>{children}</ScrollView>
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
                {headerComponent()}
            </SafeAreaView>
        </ImageBackground>
    ) : (
        <SafeAreaView style={[globalStyles.container]}>
            <View style={[globalStyles.container]}>{headerComponent()}</View>
        </SafeAreaView>
    );
};

export default ContainerComponent