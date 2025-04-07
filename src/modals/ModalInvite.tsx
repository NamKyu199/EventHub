import React, { useEffect, useRef, useState } from 'react'
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import { ButtonComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent, UserComponent } from '~components';
import { authSelector, AuthState } from '~redux/reducers/authReducer';
import { useSelector } from 'react-redux';
import { fontFamililes } from '~constants/fontFamililes';
import { SearchNormal1, TickCircle } from 'iconsax-react-native';
import { appColors } from '~constants/appColors';
import { Alert, ScrollView, Share, View } from 'react-native';
import userAPI from '~apis/userApi';

interface Props {
    visible: boolean,
    onClose: () => void;
    eventId: string,
    creatorId: string,
}

const ModalInvite = (props: Props) => {
    const { visible, onClose, eventId, creatorId } = props
    const auth: AuthState = useSelector(authSelector);
    const modalizeRef = useRef<Modalize>();
    const [friendIds, setfriendIds] = useState<string[]>([]);
    const [userSelected, setUserSelected] = useState<string[]>([]);

    useEffect(() => {
        if (auth.following && auth.following.length > 0) {
            setfriendIds(auth.following)
        }
    }, [auth])

    useEffect(() => {
        if (visible && modalizeRef.current) {
            modalizeRef.current.open();
        } else if (modalizeRef.current) {
            modalizeRef.current.close();
        }
    }, [visible]);

    const handleSelectedId = (id: string) => {
        const items: string[] = [...userSelected];
        const index = items.findIndex(element => element === id);

        if (index !== -1) {
            items.splice(index, 1)
        } else {
            items.push(id)
        }

        setUserSelected(items)
    };

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: "🎉 Bạn được mời tham gia sự kiện hấp dẫn! \nHãy tham gia cùng chúng tôi để trải nghiệm những khoảnh khắc tuyệt vời nhất. 🌟",
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    const handleSendInviteNotification = async () => {
        const api = `/send-invite`;
        console.log("📤 Đang gửi lời mời từ user:", auth.id);

        try {
            await userAPI.HandleUser(api, {
                id: auth.id,
                eventId: eventId
            }, 'post');
        } catch (error) {
            console.log("❌ Lỗi khi gửi lời mời:", error);
        }
    };

    return (
        <Portal>
            <Modalize
                adjustToContentHeight
                handlePosition="inside"
                ref={modalizeRef}
                onClose={onClose}
                FooterComponent={
                    <SectionComponent>
                        <ButtonComponent text='Invite' type='primary' onPress={() => {
                            onShare();
                            handleSendInviteNotification();
                            onClose();
                        }} />
                    </SectionComponent>
                }
            >
                <ScrollView>
                    <SectionComponent styles={{ paddingTop: 30 }}>
                        <TextComponent
                            title
                            text="Invite Friend"
                            size={24}
                            font={fontFamililes.medium}
                        />
                        <SpaceComponent height={12} />
                        <InputComponent
                            placeholder="Search"
                            value=""
                            onChange={val => console.log(val)}
                            suffix={
                                <SearchNormal1 size={20} color={appColors.primary} />
                            }
                            allowClear
                        />
                        {Array.isArray(friendIds) && friendIds.length > 0
                            ? friendIds
                                .filter((id: string) => id !== auth.id) // Lọc bỏ chính mình
                                .map((id: string) => (
                                    <RowComponent key={id}>
                                        <View style={{ flex: 1 }}>
                                            <UserComponent
                                                userId={id}
                                                type="Invite"
                                                onPress={() => handleSelectedId(id)} />
                                        </View>
                                        <TickCircle
                                            size={24}
                                            color={userSelected.includes(id) ? appColors.primary : appColors.gray2}
                                            variant={userSelected.includes(id) ? 'Bold' : 'Outline'}
                                        />
                                    </RowComponent>
                                ))
                            : <TextComponent text="No friends" />}
                    </SectionComponent>
                </ScrollView>
            </Modalize>
        </Portal>
    );
};

export default ModalInvite;