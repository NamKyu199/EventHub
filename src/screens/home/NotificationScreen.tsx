import { TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ButtonComponent, ContainerComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent, UserComponent } from '~components';
import { More } from 'iconsax-react-native';
import { appColors } from '~constants/appColors';
import userAPI from '~apis/userApi'; // API gọi dữ liệu thông báo
import { fontFamililes } from '~constants/fontFamililes';

const NotificationScreen = () => {
    const [invitedUsers, setInvitedUsers] = useState([]);
    const [userSelected, setUserSelected] = useState<string[]>([]);

    // Hàm gọi API lấy danh sách người được mời
    const fetchInvitedUsers = async () => {
        try {
            const response = await userAPI.HandleUser('/get-invited-users');
            if (response?.data) {
                setInvitedUsers(response.data);
                console.log(response.data)
            }
        } catch (error) {
            console.error("❌ Lỗi lấy thông báo người dùng:", error);
        }
    };

    // Gọi API khi màn hình được mở
    useEffect(() => {
        fetchInvitedUsers();
    }, []);

    // Hàm chọn người dùng
    const handleSelectedId = (id: string) => {
        setUserSelected((prev) =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    // Xử lý khi bấm Accept hoặc Reject
    const handleAcceptInvite = (id: string) => {
        console.log("✅ Đã chấp nhận lời mời:", id);
        handleSelectedId(id);
    };

    const handleRejectInvite = (id: string) => {
        console.log("❌ Đã từ chối lời mời:", id);
        // Xóa user khỏi danh sách hiển thị
        setInvitedUsers(prev => prev.filter((user: any) => user.userId !== id));
    };

    return (
        <ContainerComponent
            isScroll
            title="Thông Báo"
            back
            right={
                <ButtonComponent
                    iconFlex="left"
                    icon={
                        <More
                            size={22}
                            color={appColors.text}
                            style={{ transform: [{ rotate: '90deg' }] }}
                            onPress={() => { }}
                        />
                    }
                />
            }
        >
            {invitedUsers.length > 0 ? (
                invitedUsers.map((user: any) => (
                    <SectionComponent key={user.userId}>
                        <UserComponent
                            userId={user.userId}
                            type="Invite"
                            onPress={() => handleSelectedId(user.userId)}
                        />
                        <RowComponent justify='flex-start' styles={{ marginLeft: 80 }}>
                            <TouchableOpacity
                                onPress={() => handleRejectInvite(user.userId)}
                                style={{
                                    backgroundColor: appColors.white,
                                    paddingHorizontal: 20,
                                    paddingVertical: 8,
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    borderColor: appColors.gray2
                                }}>
                                <TextComponent
                                    text='Reject'
                                    color={appColors.gray}
                                    font={fontFamililes.regular}
                                />
                            </TouchableOpacity>
                            <SpaceComponent width={24} />
                            <TouchableOpacity
                                onPress={() => handleAcceptInvite(user.userId)}
                                style={{
                                    backgroundColor: appColors.primary,
                                    paddingHorizontal: 20,
                                    paddingVertical: 8,
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    borderColor: appColors.gray2
                                }}>
                                <TextComponent
                                    text='Accept'
                                    color={appColors.white}
                                    font={fontFamililes.semiBold} />
                            </TouchableOpacity>
                        </RowComponent>
                    </SectionComponent>
                ))
            ) : (
                <TextComponent text="Không có lời mời nào." />
            )}
        </ContainerComponent>
    );
};

export default NotificationScreen;
