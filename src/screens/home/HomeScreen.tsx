import {
  HambergerMenu,
  Notification,
  SearchNormal1,
  Sort,
} from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { CardComponent, RowComponent, SectionComponent, SpaceComponent, TabBarComponent, TagComponent, TextComponent } from '~components';
import { fontFamililes } from '~constants/fontFamililes';
import CircleComponent from '~components/CircleComponent';
import { authSelector } from '~redux/reducers/authReducer';
import { globalStyles } from '~styles/globalStyles';
import { appColors } from '~constants/appColors';
import CategoriesList from '~components/CategoriesList';
import EventItem from '~components/EventItem';
import appImage from '~constants/appImage';
import { appInfo } from '~constants/appInfos';
import GeoLocation from '@react-native-community/geolocation'
import axios from 'axios';
import { AddressModel } from '~models/AddressModel';

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  const [currentLocation, setCurrentLocation] = useState<AddressModel>();

  useEffect(() => {
    console.log('useEffect chạy');
    GeoLocation.getCurrentPosition(
      (position) => {
        console.log('Lấy được vị trí:', position);
        if (position.coords) {
          reverseGeoCode({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        }
      },
      (error) => {
        console.error('Lỗi lấy vị trí:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);


  const reverseGeoCode = async ({ lat, long }: { lat: Number; long: Number }) => {
    const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&apikey=1lI5kNe7xVRqbwGlWQpct5_eQCDzWWPOdl5z-VWJHkA`
    console.log('Gọi API địa chỉ với tọa độ:', lat, long);
    try {
      const res = await axios.get(api);
      const items = res.data.items;
      console.log('Kết quả API:', items[0]);
      setCurrentLocation(items[0]);
    } catch (error) {
      console.log('Lỗi API:', error);
    }
  };


  const itemEvent = {
    title: 'International Band Music Concert',
    descriptiont: 'Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.',
    location: {
      title: 'Gala Convention Center',
      address: '36 Guild Street London, UK '
    },
    imageUrl: '',
    users: [''],
    authorId: '',
    startAt: Date.now(),
    endAt: Date.now(),
    Date: Date.now(),
  }

  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle={'light-content'} />

      {/* Header Section */}
      <View
        style={{
          backgroundColor: appColors.primary,
          height: 178 + (Platform.OS === 'ios' ? 16 : 0),
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 52,
        }}>

        <View style={{ paddingHorizontal: 16 }}>
          <RowComponent>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <HambergerMenu size={24} color={appColors.white} />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <RowComponent>
                <TextComponent
                  text="Vị trí hiện tại"
                  color={appColors.white2}
                  size={12}
                />
                <MaterialIcons
                  name="arrow-drop-down"
                  size={18}
                  color={appColors.white}
                />
              </RowComponent>
              {currentLocation && (
                <TextComponent
                  text={`${currentLocation.address.city},${currentLocation.address.countryCode}`}
                  flex={0}
                  color={appColors.white}
                  font={fontFamililes.medium}
                  size={13}
                />
              )}
            </View>

            <CircleComponent color="#524CE0" size={36}>
              <View>
                <Notification size={18} color={appColors.white} />
                <View
                  style={{
                    backgroundColor: '#02E9FE',
                    width: 10,
                    height: 10,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: '#524CE0',
                    position: 'absolute',
                    top: -2,
                    right: -2,
                  }}
                />
              </View>
            </CircleComponent>
          </RowComponent>
          <SpaceComponent height={24} />
          <RowComponent>
            <RowComponent
              styles={{ flex: 1 }}
              onPress={() =>
                navigation.navigate('SearchEvents', {
                  isFilter: false,
                })
              }>
              <SearchNormal1
                variant="TwoTone"
                size={22}
                color={appColors.white}
              />
              <View
                style={{
                  width: 1,
                  height: 18,
                  marginHorizontal: 12,
                  backgroundColor: '#A29EF0',
                }}
              />
              <TextComponent text="Search..." color={`#A29EF0`} flex={1} />
            </RowComponent>

            <TagComponent
              lable="Filters"
              icon={
                <CircleComponent size={20} color="#B1AEFA">
                  <Sort size={16} color="#5D56F3" />
                </CircleComponent>
              }
              bgColor="#5D56F3"
              onPress={() =>
                navigation.navigate("SearchEvents", {
                  isFilter: true,
                })
              }
            />
          </RowComponent>
          <SpaceComponent height={24} />
        </View>
      </View>

      {/* CategoriesList luôn hiển thị */}
      <View
        style={{
          position: 'absolute', // Cố định vị trí
          top: 160, // Điều chỉnh vị trí phù hợp
          left: 0,
          right: 0,
          zIndex: 999, // Đảm bảo nó trên cùng
          paddingBottom: 10, // Tạo khoảng cách cho đẹp
        }}
      >
        <CategoriesList isColor />
      </View>

      {/* Nội dung chính với ScrollView */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, paddingTop: 40 }} // Tạo khoảng cách với CategoriesList
      >
        <SectionComponent>
          <TabBarComponent title='Upcoming Events' onPress={() => { }} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Array.from({ length: 5 })}
            renderItem={({ item, index }) => (
              <EventItem key={`event${index}`} item={itemEvent} type={'card'} />
            )}
          />
          <CardComponent bgColor='#D6FEFF' styles={{ borderRadius: 16, padding: 16 }}>
            <RowComponent styles={{ alignItems: 'center' }}>
              <Image source={appImage.InviteLogo} style={{ height: appInfo.size.WIDTH * 0.12, width: appInfo.size.HEIGHT * 0.12 }} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <TextComponent text="Invite your friends" size={18} font={fontFamililes.bold} />
                <TextComponent text="Get $20 for ticket" size={14} color={appColors.gray} />
                <TouchableOpacity style={{
                  backgroundColor: '#00CFFF',
                  paddingVertical: 8,
                  paddingHorizontal: 20,
                  borderRadius: 8,
                  marginTop: 8,
                  alignSelf: 'flex-start',
                }}>
                  <TextComponent text="INVITE" color={appColors.white} size={14} />
                </TouchableOpacity>
              </View>
            </RowComponent>
          </CardComponent>

          <TabBarComponent title='Neaby You' onPress={() => { }} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Array.from({ length: 5 })}
            renderItem={({ item, index }) => (
              <EventItem key={`event${index}`} item={itemEvent} type={'card'} />
            )}
          />
        </SectionComponent>
      </ScrollView>
    </View>

  );
};

export default HomeScreen;
