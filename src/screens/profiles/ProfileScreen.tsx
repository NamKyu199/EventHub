import { ActivityIndicator, StatusBar, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, AuthState } from '~redux/reducers/authReducer'
import { AvatarComponent, ContainerComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '~components'
import userAPI from '~apis/userApi'
import { globalStyles } from '~styles/globalStyles'

const ProfileScreen = ({ navigation, route }: any) => {
  const dispatch = useDispatch();
  const auth: AuthState = useSelector(authSelector);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileModel>();
  const [userFollowers, setUserFollowers] = useState<string[]>([]);
  const [profileId, setProfileId] = useState('');

  useEffect(() => {
    if (route.params) {
      const { id } = route.params;
      setProfile(id);
    } else {
      setProfileId(auth.id)
    }
  }, [route])

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
      res && res.data && setProfile(res.data)
      setIsLoading(false)
    } catch (error) {
      console.log('Lỗi không thể lấy thông tin Profile', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFollowersByUid = async () => {
    const api = `/get-followers?uid=${profileId}`
    try {
      const res = await userAPI.HandleUser(api)
      setUserFollowers(res.data)
    } catch (error) {
      console.log('Lỗi không thể lấy followers từ API !!!')
    }
  }

  return (
    <ContainerComponent back title='Profile'>
      {isLoading ? (
        <ActivityIndicator />
      ) : profile ? (
        <>
          <SectionComponent>
            <RowComponent>
              <AvatarComponent
                photoURL={profile.photoUrl}
                name={profile.fullName ? profile.fullName : profile.email}
                size={120}
              />
            </RowComponent>
            <SpaceComponent height={16} />
            <TextComponent text={profile.fullName ? profile.fullName : profile.email} title size={24} styles={{ textAlign: 'center' }} />
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
          {

          }
        </>
      ) : (
        <TextComponent text='Profile not found' />
      )}
    </ContainerComponent>
  )
}

export default ProfileScreen;
