import { View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SpaceComponent, TextComponent, RowComponent } from '~components';
import { fontFamililes } from '~constants/fontFamililes';
import { appColors } from '~constants/appColors';
import userAPI from '~apis/userApi';
import appImage from '~constants/appImage';

interface Props {
    userId: string,
    type: 'Notification' | 'Invite',
    onPress: () => void
}

const UserComponent = (props: Props) => {
    const { userId, type, onPress } = props
    const [profile, setProfile] = useState<ProfileModel>();

    useEffect(() => {
        getProfile();
    }, [userId]);

    const getProfile = async () => {
        const api = `/get-profile?uid=${userId}`;
        try {
            const res = await userAPI.HandleUser(api);
            if (res && res.data) {
                console.log('✅ API response:', res.data);
                setProfile(res.data);
            } else {
                console.log('❌ Không nhận được dữ liệu Profile');
            }
        } catch (error) {
            console.log('❌ Lỗi không thể lấy thông tin Profile', error);
        }
    };

    return (
        profile && (
            <RowComponent onPress={onPress}>
                <Image
                    source={profile?.photoUrl ? { uri: profile.photoUrl } : appImage.AvatarDemo}
                    style={{ width: 48, height: 48, borderRadius: 12, resizeMode: 'cover', marginHorizontal: 12 }}
                />
                <SpaceComponent width={12} />
                <View style={{ flex: 1, height: 48, justifyContent: 'space-around' }}>
                    <TextComponent text={profile.fullName} font={fontFamililes.medium} size={16} styles={{ marginTop: -10 }} />
                    <TextComponent text={profile.email} color={appColors.gray} styles={{ marginTop: -10 }} />
                </View>
            </RowComponent>
        )
    );
};

export default UserComponent;
