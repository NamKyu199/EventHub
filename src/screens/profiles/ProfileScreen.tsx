import { ActivityIndicator, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, AuthState } from '~redux/reducers/authReducer';
import { AvatarComponent, ButtonComponent, ContainerComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '~components';
import userAPI from '~apis/userApi';
import { globalStyles } from '~styles/globalStyles';
import AboutProfile from './components/AboutProfile';
import EditProfile from './components/EditProfile';
import { appColors } from '~constants/appColors';
import { More } from 'iconsax-react-native';

const ProfileScreen = ({ navigation, route }: any) => {
  const { id } = route.params || {};
  const dispatch = useDispatch();
  const auth: AuthState = useSelector(authSelector);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileModel | null>(null);
  const [userFollowers, setUserFollowers] = useState<string[]>([]);
  const profileId = id || auth.id;

  // ✅ Khi quay lại màn hình, cập nhật profile nếu cần
  useEffect(() => {
    if (route.params?.updatedProfile) {
      setProfile(route.params.updatedProfile);
    }
  }, [route.params?.updatedProfile]);

  useEffect(() => {
    if (profileId) {
      getProfile();
      getFollowersByUid();
    }
  }, [profileId]);

  const getProfile = async () => {
    const api = `/get-profile?uid=${profileId}`;
    setIsLoading(true);
    try {
      const res = await userAPI.HandleUser(api);
      if (res?.data) {
        setProfile(res.data);
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.log('❌ Lỗi không thể lấy thông tin Profile', error);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getFollowersByUid = async () => {
    const api = `/get-followers?uid=${profileId}`;
    try {
      const res = await userAPI.HandleUser(api);
      setUserFollowers(res.data);
    } catch (error) {
      console.log('❌ Lỗi không thể lấy followers từ API');
    }
  };

  // ✅ Component hiển thị thông tin Profile
  const ProfileHeader = () => (
    <SectionComponent>
      <RowComponent>
        <AvatarComponent
          photoURL={profile?.photoUrl}
          name={profile?.fullName || profile?.email || "Unknown User"}
          size={120}
        />
      </RowComponent>
      <SpaceComponent height={16} />
      <TextComponent
        text={profile?.fullName || profile?.email || "Unknown User"}
        title
        size={24}
        styles={{ textAlign: 'center' }}
      />
      <SpaceComponent height={26} />
      <RowComponent>
        <View style={[globalStyles.center, { flex: 1 }]}>
          <TextComponent title text={`${profile?.following?.length || 0}`} size={20} />
          <SpaceComponent height={4} />
          <TextComponent text='Following' />
        </View>
        <View
          style={{
            backgroundColor: appColors.gray,
            width: 1,
            height: '100%'
          }}
        />
        <View style={[globalStyles.center, { flex: 1 }]}>
          <TextComponent title text={`${userFollowers.length}`} size={20} />
          <SpaceComponent height={4} />
          <TextComponent text='Followers' />
        </View>
      </RowComponent>
    </SectionComponent>
  );

  // ✅ Xác định màn hình hiển thị
  const renderProfileScreen = () => {
    return !id || `${id}` === `${auth.id}`
      ? <EditProfile profile={profile} />
      : <AboutProfile profile={profile} />;
  };

  return (
    <ContainerComponent
      back
      title='Profile'
      right={
        <ButtonComponent
          iconFlex="left"
          icon={
            <More
              size={22}
              color={appColors.text}
              style={{ transform: [{ rotate: '90deg' }] }} // Xoay về góc 0 độ
              onPress={() => { }}
            />
          }
        />
      }
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : profile ? (
        <>
          <ProfileHeader />
          {renderProfileScreen()}
        </>
      ) : (
        <TextComponent text='Profile not found' />
      )}
    </ContainerComponent>
  );
};

export default ProfileScreen;
