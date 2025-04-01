import {
  HambergerMenu,
  Notification,
  SearchNormal1,
  Sort,
} from 'iconsax-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CardComponent, RowComponent, SectionComponent, SpaceComponent, TabBarComponent, TagComponent, TextComponent } from '~components';
import { fontFamililes } from '~constants/fontFamililes';
import CircleComponent from '~components/CircleComponent';
import { globalStyles } from '~styles/globalStyles';
import { appColors } from '~constants/appColors';
import CategoriesList from '~components/CategoriesList';
import EventItem from '~components/EventItem';
import appImage from '~constants/appImage';
import { appInfo } from '~constants/appInfos';
import GeoLocation from '@react-native-community/geolocation'
import axios from 'axios';
import { AddressModel } from '~models/AddressModel';
import eventAPI from '~apis/eventApi';
import { EventModle } from '~models/EventModel';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }: any) => {
  const [currentLocation, setCurrentLocation] = useState<AddressModel>();
  const [events, setEvents] = useState<EventModle[]>([]);
  const [nearbyEvents, setNearbyEvents] = useState<EventModle[]>([]);

  // ✅ Tự động load lại khi HomeScreen được focus
  useFocusEffect(
    useCallback(() => {
      getEvents(); // Load sự kiện khi vào HomeScreen
    }, [])
  );

  useEffect(() => {
    GeoLocation.getCurrentPosition(
      (position) => {
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
      {
        enableHighAccuracy: true,
        timeout: 5000,        // ⏱ Rút ngắn thời gian chờ (5 giây)
        maximumAge: 0         // ♻️ Luôn lấy vị trí mới nhất, không dùng cache
      }
    );
    getEvents();
  }, []);


  useEffect(() => {
    currentLocation && getEvents(currentLocation.position.lat, currentLocation.position.lng);
  }, [currentLocation])


  const reverseGeoCode = async ({ lat, long }: { lat: Number; long: Number }) => {
    const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&apikey=Emu9xnnh1DW0lbtTTQPDpUfPanKQfq4gSLHAKQPV6xE`
    try {
      const res = await axios.get(api);
      const items = res.data.items;
      setCurrentLocation(items[0]);
    } catch (error) {
      console.log('Lỗi API:', error);
    }
  };

  const getEvents = async (lat?: number, long?: number, distance?: number) => {
    const api = lat && long ? `/get-event?lat=${lat}&long=${long}&distance=${distance ?? 30}limit=5` : `/get-event?limit=10`;

    try {
      const res = await eventAPI.HandleEvent(api);
      res && res.data && lat && long ? setNearbyEvents(res.data) : setEvents(res.data);
    } catch (error) {
      console.log('Lỗi API in HomeScreeen:', error);
    }
  }

  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle='dark-content' />

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
                  text={`${currentLocation.address.city} • ${currentLocation.address.countryName}`}
                  flex={0}
                  color={appColors.white}
                  font={fontFamililes.medium}
                  size={13}
                />
              )}
            </View>

            <CircleComponent color="#524CE0" size={36}>
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('NotificationScreen')}
                >
                  <Notification
                    size={18}
                    color={appColors.white}
                  />
                </TouchableOpacity>
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
          <TabBarComponent title='Upcoming Events' onPress={() => navigation.navigate('ExploreEvents')} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={events}
            renderItem={({ item, index }) => (
              <EventItem key={`event${index}`} item={item} type={'card'} />
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
          <TabBarComponent title='Nearby You' onPress={() => { }} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={nearbyEvents}
            renderItem={({ item, index }) => (
              <EventItem key={`event${index}`} item={item} type={'card'} />
            )}
          />
        </SectionComponent>
      </ScrollView>
    </View>

  );
};

export default HomeScreen;
