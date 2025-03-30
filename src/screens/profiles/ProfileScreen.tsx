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

  // ✅ Lấy profile và followers đồng thời
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [profileRes, followersRes] = await Promise.all([
          userAPI.HandleUser(`/get-profile?uid=${profileId}`),
          userAPI.HandleUser(`/get-followers?uid=${profileId}`)
        ]);
        setProfile(profileRes?.data || null);
        setUserFollowers(followersRes?.data || []);
      } catch (error) {
        console.log('❌ Lỗi tải dữ liệu:', error);
        setProfile(null);
      } finally {
        // ✅ Hiển thị loading sau 200ms
        timeoutId = setTimeout(() => setIsLoading(false), 200);
      }
    };

    fetchData();
    return () => clearTimeout(timeoutId);
  }, [profileId]);

  // ✅ Khi quay lại màn hình, cập nhật profile nếu cần
  useEffect(() => {
    if (route.params?.updatedProfile) {
      setProfile(route.params.updatedProfile);
    }
  }, [route.params?.updatedProfile]);

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
      : <AboutProfile />;
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
