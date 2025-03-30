import { ActivityIndicator, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAuth, authSelector, AuthState } from '~redux/reducers/authReducer';
import { AvatarComponent, ContainerComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '~components';
import userAPI from '~apis/userApi';
import { globalStyles } from '~styles/globalStyles';
import AboutProfile from './components/AboutProfile';
import EditProfile from './components/EditProfile';

const ProfileScreen = ({ navigation, route }: any) => {
  const { id } = route.params || {};
  const dispatch = useDispatch();
  const auth: AuthState = useSelector(authSelector);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileModel | null>(null);
  const [userFollowers, setUserFollowers] = useState<string[]>([]);
  const [profileId, setProfileId] = useState<string>('');

  useEffect(() => {
    setProfileId(id ? `${id}` : `${auth.id}`);
  }, [id, auth.id]);

  // ✅ Kiểm tra params khi quay lại màn hình
  useEffect(() => {
    if (route.params?.updatedProfile) {
      // Nếu có params updatedProfile, set lại profile
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

  const renderProfileScreen = () => {
    if (!id) return <EditProfile profile={profile} />;
    if (`${id}` === `${auth.id}`) return <EditProfile profile={profile} />;
    return <AboutProfile />;
  };

  return (
    <ContainerComponent back title='Profile'>
      {isLoading ? (
        <ActivityIndicator />
      ) : profile ? (
        <>
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
                <TextComponent title text={`${profile.following.length}`} size={20} />
                <TextComponent text='Following' />
              </View>
              <View style={[globalStyles.center, { flex: 1 }]}>
                <TextComponent title text={`${userFollowers.length}`} size={20} />
                <TextComponent text='Followers' />
              </View>
            </RowComponent>
          </SectionComponent>

          {/* ✅ Điều kiện hiển thị */}
          {renderProfileScreen()}
        </>
      ) : (
        <TextComponent text='Profile not found' />
      )}
    </ContainerComponent>
  );
};

export default ProfileScreen;
