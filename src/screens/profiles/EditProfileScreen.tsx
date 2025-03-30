import React, { useState } from 'react'
import { ImageOrVideo } from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import { AvatarComponent, ButtonComponent, ButtonImagePicker, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent } from '~components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userAPI from '~apis/userApi';
import { LoadingModal } from '~modals';
import { useDispatch } from 'react-redux';
import { addAuth } from '~redux/reducers/authReducer';

const EditProfileScreen = ({ navigation, route }: any) => {
    const { profile }: { profile: ProfileModel } = route.params;
    const [fileSelected, setFileSelected] = useState<any>();
    const [profileData, setProfileData] = useState<ProfileModel>(profile);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();


    const handleFileSelected = (val: ImageOrVideo) => {
        setFileSelected(val);
        setProfileData(prev => ({
            ...prev,
            photoUrl: val.path
        }));
    };

    const handleChangeValue = (key: keyof ProfileModel, value: any) => {
        setProfileData(prev => ({
            ...prev,
            [key]: value
        }));
    };


    const saveImageToStorage = async (file: ImageOrVideo) => {
        try {
            if (!file?.path) return null;

            const filename = file.filename || `image_${Date.now()}.jpg`;
            const destPath = `${RNFS.DocumentDirectoryPath}/${filename}`;

            await RNFS.copyFile(file.path, destPath);

            return `file://${destPath}`;

        } catch (error) {
            console.error("Lỗi khi lưu ảnh:", error);
            return null;
        }
    };

    const handleUpdateProfile = async () => {
        try {
            setIsLoading(true);
            let savedPhotoPath = profileData.photoUrl;
            if (fileSelected) {
                const newPath = await saveImageToStorage(fileSelected);
                if (newPath) {
                    savedPhotoPath = newPath;
                }
            }
            const newProfileData = {
                ...profileData,
                photoUrl: savedPhotoPath,
                fullName: profileData.fullName,
                bio: profileData.bio
            };

            await AsyncStorage.setItem("savedProfile", JSON.stringify(newProfileData));

            // ✅ Thêm dispatch để lưu vào redux
            dispatch(addAuth({
                ...profile,
                photo: savedPhotoPath,
                fullName: profileData.fullName,
            }));

            await userAPI.HandleUser(`/update-profile?uid=${profile.uid}`, newProfileData, 'put');
            navigation.navigate('ProfileScreen', {
                params: { updatedProfile: newProfileData }
            });
        } catch (error) {
            console.error("Lỗi cập nhật:", error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <ContainerComponent isScroll back title={profile.fullName}>
            <SectionComponent>
                <RowComponent>
                    <AvatarComponent
                        photoURL={profileData.photoUrl}
                        name={profileData.fullName || profileData.email}
                        size={120}
                    />
                </RowComponent>
                <SpaceComponent height={12} />
                <RowComponent>
                    <ButtonImagePicker onSelect={(val: any) =>
                        val.type === 'url'
                            ? handleChangeValue('photoUrl', val.value as string)
                            : handleFileSelected(val)
                    } />
                </RowComponent>
                <InputComponent
                    placeholder='Full name'
                    value={`${profileData.fullName}`}
                    onChange={val => handleChangeValue('fullName', val)}
                    allowClear
                />
                <InputComponent
                    placeholder='Giới thiệu'
                    value={`${profileData.bio}`}
                    onChange={val => handleChangeValue('bio', val)}
                    allowClear
                    multiline
                    numberOfLines={5}
                />

                <ButtonComponent
                    disable={JSON.stringify(profileData) === JSON.stringify(profile)}
                    text='Update'
                    type='primary'
                    onPress={handleUpdateProfile}
                />
            </SectionComponent>
            <LoadingModal visible={isLoading} />
        </ContainerComponent>
    )
}

export default EditProfileScreen