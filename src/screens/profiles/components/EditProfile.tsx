import { useNavigation } from "@react-navigation/native";
import { Edit } from "iconsax-react-native";
import { useEffect } from "react";
import { ButtonComponent, RowComponent, SectionComponent, SpaceComponent, TagComponent, TextComponent } from "~components"
import { appColors } from "~constants/appColors";
import { appInfo } from "~constants/appInfos";

interface Props {
    profile: ProfileModel | null;
}

const EditProfile = (props: Props) => {
    const { profile } = props;

    // Kiểm tra nếu profile là null
    if (!profile) {
        return <TextComponent text="Không tìm thấy thông tin" />;
    };

    const navigation: any = useNavigation();

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
                <RowComponent>

                    <TextComponent text="Interest" title size={18} flex={1} />
                    <ButtonComponent text="Change" type='link' />

                </RowComponent>
                <RowComponent styles={{ flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                    {[...Array(10)].map((_, index) => (
                        <TagComponent
                            key={`tag-${index}`}
                            bgColor='#000000'
                            lable="Music"
                            styles={{ marginRight: 9, marginBottom: 12 }}
                            onPress={() => { }} />
                    ))}
                </RowComponent>
            </>
        </SectionComponent>
    );
};

export default EditProfile;
