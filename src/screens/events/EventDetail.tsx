import { Image, ImageBackground, Platform, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AvatarGroup, ButtonComponent, CardComponent, RowComponent, SectionComponent, SpaceComponent, TabBarComponent, TextComponent } from '~components'
import appImage from '~constants/appImage'
import { appInfo } from '~constants/appInfos'
import { ArrowLeft, ArrowRight, Calendar, Location, Save2 } from 'iconsax-react-native'
import { appColors } from '~constants/appColors'
import { globalStyles } from '~styles/globalStyles'
import LinearGradient from 'react-native-linear-gradient';
import { EventModle } from '~models/EventModel'
import { fontFamililes } from '~constants/fontFamililes'


const EventDetail = ({ navigation, route }: any) => {
    const { item }: { item: EventModle } = route.params
    return (
        <View style={{ flex: 1, backgroundColor: appColors.white }}>
            <ImageBackground
                source={appImage.EventBackGround}
                style={{
                    flex: 1,
                    height: appInfo.size.HEIGHT * 0.3
                }}
                imageStyle={{
                    resizeMode: 'cover',
                }}
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0)']}
                >
                    <RowComponent styles={{
                        padding: 16,
                        paddingTop: 42,
                    }}>
                        <RowComponent styles={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <ArrowLeft size={24} color={appColors.white} />
                            </TouchableOpacity>
                            <SpaceComponent width={8} />
                            <TextComponent flex={1} text='Event' title color={appColors.white} />
                        </RowComponent>
                        <CardComponent styles={[globalStyles.nospaceCard, { width: 36, height: 36 }]} bgColor='#FFFFFF4D'>
                            <Save2
                                size="20"
                                color={appColors.white}
                                variant="Bold"
                            />
                        </CardComponent>
                    </RowComponent>
                </LinearGradient>
                <View
                    style={{
                        flex: 1,
                        paddingTop: 204 - 106
                    }}>
                    <SectionComponent>
                        <View style={{ marginTop: -10, justifyContent: 'center', alignItems: 'center' }}>
                            <RowComponent
                                justify='space-between'
                                styles={[
                                    globalStyles.shadow,
                                    {
                                        backgroundColor: appColors.white,
                                        borderRadius: 100,
                                        paddingHorizontal: 12,
                                        width: appInfo.size.WIDTH * 0.8
                                    }]}
                            >
                                <AvatarGroup size={36} />
                                <TouchableOpacity
                                    style={[
                                        globalStyles.button,
                                        { backgroundColor: appColors.primary, paddingHorizontal: 20, paddingVertical: 6 }
                                    ]}
                                >
                                    <TextComponent text='Invite' color={appColors.white} />
                                </TouchableOpacity>
                            </RowComponent>
                        </View>
                    </SectionComponent>
                    <ScrollView showsVerticalScrollIndicator={false} style={{
                        backgroundColor: appColors.white
                    }}>
                        <SectionComponent>
                            <TextComponent text={item.title} title size={34} font={fontFamililes.medium} />
                        </SectionComponent>
                        <SectionComponent>
                            <RowComponent>
                                <CardComponent styles={[globalStyles.nospaceCard, { width: 48, height: 48 }]} bgColor={`${appColors.primary}4D`}>
                                    <Calendar
                                        size="32"
                                        color={appColors.primary}
                                        variant="Bold"
                                    />
                                </CardComponent>
                                <SpaceComponent width={12} />
                                <View style={{ flex: 1, height: 48, justifyContent: 'space-around' }}>
                                    <TextComponent text='14 December, 2021' font={fontFamililes.medium} size={16} styles={{ marginTop: -10 }} />
                                    <TextComponent text='Tuesday, 4:00PM - 9:00PM' color={appColors.gray} styles={{ marginTop: -10 }} />
                                </View>
                            </RowComponent>
                            <RowComponent>
                                <CardComponent styles={[globalStyles.nospaceCard, { width: 48, height: 48 }]} bgColor={`${appColors.primary}4D`}>
                                    <Location
                                        size="32"
                                        color={appColors.primary}
                                        variant="Bold"
                                    />
                                </CardComponent>
                                <SpaceComponent width={12} />
                                <View style={{ flex: 1, height: 48, justifyContent: 'space-around' }}>
                                    <TextComponent text={item.location.title} font={fontFamililes.medium} size={16} styles={{ marginTop: -10 }} />
                                    <TextComponent text={item.location.address} color={appColors.gray} styles={{ marginTop: -10 }} />
                                </View>
                            </RowComponent>
                            <RowComponent>
                                <Image source={appImage.AvatarDemo} style={{ width: 48, height: 48, borderRadius: 12, resizeMode: 'cover', marginHorizontal: 12 }} />
                                <SpaceComponent width={12} />
                                <View style={{ flex: 1, height: 48, justifyContent: 'space-around' }}>
                                    <TextComponent text='Son tung MTP' font={fontFamililes.medium} size={16} styles={{ marginTop: -10 }} />
                                    <TextComponent text='M-TP ENTERTAINMENT' color={appColors.gray} styles={{ marginTop: -10 }} />
                                </View>
                            </RowComponent>
                        </SectionComponent>
                        <TabBarComponent title='About Event' />
                        <SectionComponent>
                            <TextComponent text={item.descriptiont} />
                        </SectionComponent>
                    </ScrollView>
                </View>
            </ImageBackground>
            <LinearGradient
                colors={['rgba(255,255,255,0.5)', 'rgba(255,255,255,1)']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    left: 0,
                    padding: 12
                }}
            >
                <ButtonComponent
                    text='BUY TICKET $120'
                    type='primary'
                    onPress={() => { }}
                    iconFlex='right'
                    icon={
                        <View style={[globalStyles.iconContainer, { backgroundColor: appColors.primary2 }]}>
                            <ArrowRight size={20} color={appColors.white} />
                        </View>
                    }
                />
            </LinearGradient>

        </View>
    )
}

export default EventDetail