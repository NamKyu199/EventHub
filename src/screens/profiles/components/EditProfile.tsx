import { useNavigation } from "@react-navigation/native";
import { Edit, Edit2 } from "iconsax-react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import eventAPI from "~apis/eventApi";
import { ButtonComponent, RowComponent, SectionComponent, SpaceComponent, TagComponent, TextComponent } from "~components"
import { appColors } from "~constants/appColors";
import { appInfo } from "~constants/appInfos";
import ModalSeclectCategories from "~modals/ModalSeclectCategories";
import { Category } from "~models/Category";
import { globalStyles } from "~styles/globalStyles";

interface Props {
    profile: ProfileModel | null;
}

const EditProfile = (props: Props) => {
    const { profile } = props;
    const navigation: any = useNavigation();
    const [isVisibleModalCategory, setIsVisibleModalCategory] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories();
    }, [])

    // Kiểm tra nếu profile là null
    if (!profile) {
        return <TextComponent text="Không tìm thấy thông tin" />;
    };

    const getCategories = async () => {
        const api = `/get-categories`;
        try {
            const res = await eventAPI.HandleEvent(api);
            // Kiểm tra phản hồi từ API
            if (res?.data) {
                setCategories(res.data); // Cập nhật state categories
            } else {
                console.log("Phản hồi API không hợp lệ:", res);
            }
        } catch (error) {
            console.log("Lỗi lấy danh sách categories:", error);
        }
    };

    return (
        <SectionComponent>
            <RowComponent>
                <ButtonComponent
                    styles={{
                        borderWidth: 1,
                        borderColor: appColors.primary,
                        backgroundColor: appColors.white,
                        width: appInfo.size.WIDTH * 0.45
                    }}
                    text="Edit Profile"
                    onPress={() => navigation.navigate('EditProfileScreen', { profile })}
                    type='primary'
                    textColor={appColors.primary}
                    iconFlex='left'
                    icon={
                        <Edit color={appColors.primary} size={24} />
                    }
                />
            </RowComponent>
            <TextComponent text="About" title size={18} />
            <TextComponent text={profile.bio} />
            <SpaceComponent height={20} />
            <>
                <RowComponent >
                    <TextComponent text="Interest" title size={18} flex={1} />
                    <ButtonComponent
                        styles={[globalStyles.tag, {
                            backgroundColor: 'rgba(86, 105, 255, 0.1)',
                            width: appInfo.size.WIDTH * 0.3
                        }]}
                        text="Change"
                        type='primary'
                        textColor={appColors.primary}
                        textStyles={{ fontSize: 13 }}
                        iconFlex='left'
                        icon={
                            <Edit2 size={14} color={appColors.primary} />
                        }
                        onPress={() => setIsVisibleModalCategory(true)}
                    />
                </RowComponent>
                <RowComponent styles={{ flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                    {categories.length > 0 &&
                        profile.interests &&
                        categories.map((item, index) =>
                            profile.interests?.includes(item._id) && (
                                <View key={item._id}
                                    style={[globalStyles.tag, {
                                        backgroundColor: item.color,
                                        margin: 6
                                    }]}
                                >
                                    <TextComponent text={item.title} color={appColors.white} />
                                </View>
                            ))}
                </RowComponent>
            </>

            <ModalSeclectCategories
                seletected={profile.interests}
                onSelected={vals => {
                    navigation.setParams({
                        updatedProfile: {
                            ...profile,
                            interests: vals
                        }
                    });
                }}
                onClose={() => setIsVisibleModalCategory(false)}
                visible={isVisibleModalCategory}
            />
        </SectionComponent>
    );
};

export default EditProfile;
