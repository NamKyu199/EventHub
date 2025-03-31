import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { appColors } from '~constants/appColors'
import { ButtonComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '~components'
import { Messages3, UserAdd, UserRemove } from 'iconsax-react-native'
import { globalStyles } from '~styles/globalStyles'
import { fontFamililes } from '~constants/fontFamililes'
import { appInfo } from '~constants/appInfos'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, updateFollowing } from '~redux/reducers/authReducer'
import userAPI from '~apis/userApi'
import { LoadingModal } from '~modals'

interface Props {
    profile: ProfileModel | null;
}

const AboutProfile = (props: Props) => {
    const { profile } = props;
    const auth = useSelector(authSelector);
    const dispatch = useDispatch();
    const [tabSelected, setTabSelected] = useState('about');
    const [idLoading, setIdLoading] = useState(false);

    useEffect(() => {
        handleToggleFollowing();
    }, [profile]);

    const tabs = [
        {
            key: 'about',
            title: 'About',
        },
        {
            key: 'events',
            title: 'Events',
        },
        {
            key: 'reviews',
            title: 'Reviews',
        },
    ];

    const renderTabContent = (id: string) => {
        let content = <></>;

        switch (id) {
            case 'about':
                content =
                    <>
                        {profile ? (
                            <TextComponent text={profile.bio} />
                        ) : (
                            <TextComponent text="No information available." />
                        )}
                    </>
                break;
            default:
                content = <></>;
                break;
        }

        return content;
    };

    const handleToggleFollowing = async () => {
        if (!profile) {
            console.log("⚠️ Profile is not available");
            return;
        }

        const api = `/update-following`;
        setIdLoading(true);

        try {
            const res = await userAPI.HandleUser(api, {
                uid: auth.id,
                authorId: profile.uid,
            }, 'put');

            dispatch(updateFollowing(res.data));
            console.log("✅ API Response:", res);
        } catch (error) {
            console.log("❌ API Error:", error);
        } finally {
            setIdLoading(false); // Đảm bảo luôn tắt loading
        }
    };

    return (
        <>
            <SectionComponent>
                <RowComponent>
                    <TouchableOpacity
                        onPress={handleToggleFollowing}
                        style={[
                            globalStyles.button,
                            {
                                flex: 1,
                                ...(auth.following && auth.following.includes(profile?.uid)
                                    ? {
                                        borderColor: appColors.primary,
                                        borderWidth: 1,
                                    }
                                    : {
                                        backgroundColor: appColors.primary,
                                    }),
                            }
                        ]}
                    >
                        {auth.following && auth.following.includes(profile?.uid) ? (
                            <>
                                <UserRemove size={22} color={appColors.primary} />
                                <SpaceComponent width={12} />
                                <TextComponent
                                    text="Unfollow"
                                    color={appColors.primary}
                                    font={fontFamililes.medium}
                                />
                            </>
                        ) : (
                            <>
                                <UserAdd size={22} color={appColors.white} />
                                <SpaceComponent width={12} />
                                <TextComponent
                                    text="Follow"
                                    color={appColors.white}
                                    font={fontFamililes.medium}
                                />
                            </>
                        )}
                    </TouchableOpacity>
                    <SpaceComponent width={20} />
                    <TouchableOpacity
                        style={[globalStyles.button,
                        {
                            flex: 1,
                            borderColor: appColors.primary,
                            borderWidth: 1
                        }
                        ]}
                    >
                        <Messages3 size={22} color={appColors.primary} />
                        <SpaceComponent width={12} />
                        <TextComponent text='Messages' color={appColors.primary} font={fontFamililes.medium} />
                    </TouchableOpacity>
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <RowComponent>
                    {tabs.map(item => (
                        <TouchableOpacity key={item.key}
                            onPress={() => setTabSelected(item.key)}
                            style={[globalStyles.center,
                            {
                                flex: 1,
                            }]}>
                            <TextComponent
                                text={item.title}
                                font={item.key === tabSelected
                                    ? fontFamililes.medium
                                    : fontFamililes.regular}
                                color={item.key === tabSelected
                                    ? appColors.primary
                                    : appColors.text}
                                size={16} />
                            <View style={{
                                width: appInfo.size.WIDTH * 0.17,
                                borderRadius: 100,
                                height: 3,
                                backgroundColor:
                                    item.key === tabSelected
                                        ? appColors.primary
                                        : appColors.white,
                                marginTop: 6
                            }} />
                        </TouchableOpacity>
                    ))}
                </RowComponent>
                {renderTabContent(tabSelected)}
            </SectionComponent>
            <LoadingModal visible={idLoading} />
        </>
    )
}

export default AboutProfile