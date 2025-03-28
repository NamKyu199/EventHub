import { Image, ImageBackground, Platform, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AvatarGroup, ButtonComponent, CardComponent, RowComponent, SectionComponent, SpaceComponent, TabBarComponent, TextComponent } from '~components'
import appImage from '~constants/appImage'
import { appInfo } from '~constants/appInfos'
import { ArrowLeft, ArrowRight, Calendar, Location, Save2 } from 'iconsax-react-native'
import { appColors } from '~constants/appColors'
import { globalStyles } from '~styles/globalStyles'
import LinearGradient from 'react-native-linear-gradient';
import { EventModle } from '~models/EventModel'
import { fontFamililes } from '~constants/fontFamililes'
import { useDispatch, useSelector } from 'react-redux'
import { addFollowedEvent, authSelector, AuthState } from '~redux/reducers/authReducer'
import eventAPI from '~apis/eventApi'
import { LoadingModal } from '~modals'
import { UserHandle } from '~utils/UserHandlers'
import { DateTime } from '~utils/DateTime'


const EventDetail = ({ navigation, route }: any) => {
    const { item }: { item: EventModle } = route.params
    const dispatch = useDispatch();
    const auth: AuthState = useSelector(authSelector);
    console.log('item', auth);
    const [isLoading, setIsLoading] = useState(false);
    const [followers, setFollowers] = useState<string[]>([]);

    useEffect(() => {
        item && getFollowersById();
    }, [item]);

    const getFollowersById = async () => {
        const api = `/get-followers?id=${item._id}`;

        try {
            const res = await eventAPI.HandleEvent(api);
            res && res.data && setFollowers(res.data);
        } catch (error) {
            console.log('Error get Followers:', error);
        }
    }

    const handleFollower = async () => {
        const items = [...followers];
        const index = items.findIndex((element) => element === auth.id);

        if (index !== -1) {
            items.splice(index, 1);
        } else {
            items.push(auth.id);
        }
        // Cập nhật Redux ngay lập tức
        dispatch(addFollowedEvent(items));
        // Cập nhật state local
        setFollowers(items);
        // Gửi API cập nhật backend
        handleUpdateFollowers(items);
    };


    const handleUpdateFollowers = async (data: string[]) => {
        try {
            const api = `/update-followers`;
            await eventAPI.HandleEvent(api, {
                id: item._id,
                followers: data
            }, 'post');
            // Lấy danh sách mới từ server sau khi cập nhật
            await UserHandle.getFollowersById(auth.id, dispatch);
        } catch (error) {
            console.log('Error update Followers:', error);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: appColors.white }}>
            <ImageBackground
                source={{ uri: item.photoUrl }}
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
                        <CardComponent
                            styles={[globalStyles.nospaceCard, { width: 36, height: 36 }]}
                            bgColor={auth.follow_events && auth.follow_events.includes(item._id) ? '#FFFFFFB3' : '#FFFFFF4D'}
                            onPress={handleFollower}
                        >
                            <Save2
                                size="20"
                                color={auth.follow_events && auth.follow_events.includes(item._id) ? appColors.danger2 : appColors.white}
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
                        {
                            item.users.length > 0 ? (
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
                                        <AvatarGroup size={36} userIds={item.users} />
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
                            ) : (
                                <>
                                    <ButtonComponent text='Intive' type='primary' styles={{ borderRadius: 100 }} />
                                </>
                            )
                        }
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
                                    <TextComponent
                                        text={`${DateTime.GetDate(new Date(item.date))}`}
                                        font={fontFamililes.medium}
                                        size={16}
                                        styles={{ marginTop: -10 }}
                                    />
                                    <TextComponent text={`${appInfo.dayFullNames[new Date(item.date).getDay()]} , ${DateTime.GetStartAndEnd(item.startAt, item.endAt)}`} color={appColors.gray} styles={{ marginTop: -10 }} />
                                </View>
                            </RowComponent>
                            <SpaceComponent height={12} />
                            <RowComponent styles={{ alignItems: 'flex-start' }}>
                                <CardComponent styles={[globalStyles.nospaceCard, { width: 48, height: 48 }]} bgColor={`${appColors.primary}4D`}>
                                    <Location
                                        size="32"
                                        color={appColors.primary}
                                        variant="Bold"
                                    />
                                </CardComponent>
                                <SpaceComponent width={12} />
                                <View style={{ flex: 1, height: 48, justifyContent: 'space-around' }}>
                                    <TextComponent text={item.locationTitle} font={fontFamililes.medium} size={16} styles={{ marginTop: -10 }} />
                                    <SpaceComponent height={12} />
                                    <TextComponent text={item.locationAddress} color={appColors.gray} styles={{ marginTop: -10 }} />
                                </View>
                            </RowComponent>
                            <SpaceComponent height={12} />
                            <RowComponent onPress={() => navigation.navigate('ProfileScreen', {
                                params: {
                                    id: item.authorId
                                }
                            })}>
                                <Image source={appImage.AvatarDemo} style={{ width: 48, height: 48, borderRadius: 12, resizeMode: 'cover', marginHorizontal: 12 }} />
                                <SpaceComponent width={12} />
                                <View style={{ flex: 1, height: 48, justifyContent: 'space-around' }}>
                                    <TextComponent text='Son tung MTP' font={fontFamililes.medium} size={16} styles={{ marginTop: -10 }} />
                                    <TextComponent text={auth.email} color={appColors.gray} styles={{ marginTop: -10 }} />
                                </View>
                            </RowComponent>
                        </SectionComponent>
                        <TabBarComponent title='About Event' />
                        <SectionComponent styles={{ paddingBottom: 150 }}>
                            <TextComponent text={item.description} />
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

            <LoadingModal visible={isLoading} />

        </View>
    )
}

export default EventDetail