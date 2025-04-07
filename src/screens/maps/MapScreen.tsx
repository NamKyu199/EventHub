import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StatusBar, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import GeoLocation from '@react-native-community/geolocation';
import { CardComponent, InputComponent, MakerCustom, RowComponent, SpaceComponent } from '~components';
import { ArrowLeft2, Gps } from 'iconsax-react-native';
import { appColors } from '~constants/appColors';
import { globalStyles } from '~styles/globalStyles';
import CategoriesList from '~components/CategoriesList';
import eventAPI from '~apis/eventApi';
import { EventModle } from '~models/EventModel';
import EventItem from '~components/EventItem';

const MapScreen = ({ navigation }: any) => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; long: number } | undefined>(undefined);
  const [events, setEvents] = useState<EventModle[]>([]);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    GeoLocation.getCurrentPosition(
      (position) => {
        if (position.coords) {
          const location = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          };
          setCurrentLocation(location);
        }
      },
      (error) => {
        console.error('❌ Lỗi lấy vị trí:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });
  }, []);

  useEffect(() => {
    if (currentLocation) getNearbyEvents();
  }, [currentLocation]);

  const getNearbyEvents = async () => {
    if (!currentLocation) return;

    const api = `/get-event?lat=${currentLocation.lat}&long=${currentLocation.long}&distance=${30}`;
    try {
      const res = await eventAPI.HandleEvent(api);

      if (Array.isArray(res.data)) {
        const validEvents = res.data.filter(event => event.position?.lat && event.position?.long);
        setEvents(validEvents);
      } else {
        console.error("❌ API trả về dữ liệu không hợp lệ:", res.data);
      }
    } catch (error) {
      console.error('Get Nearby Events Error:', error);
    }
  };

  const moveToCurrentLocation = () => {
    if (!currentLocation || !mapRef.current) return;
    mapRef.current.animateToRegion({
      latitude: currentLocation.lat,
      longitude: currentLocation.long,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    }, 1000);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle='dark-content' />

      {/* MapsView */}
      {currentLocation ? (
        <MapView
          ref={mapRef}
          style={{ width: '100%', height: '100%' }}
          showsUserLocation
          initialRegion={{
            latitude: currentLocation.lat,
            longitude: currentLocation.long,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          mapPadding={{
            top: 0,
            right: 0,
            bottom: 150,
            left: 0,
          }}
        >
          {events.map((event, index) => (
            <Marker
              key={`event${index}`}
              title={event.title}
              description={event.description}
              coordinate={{
                latitude: event.position.lat,
                longitude: event.position.long,
              }}
            >
              <MakerCustom type={event.category} />
            </Marker>
          ))}
        </MapView>
      ) : null}

      {/* Header */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: 20,
          paddingTop: 40,
        }}>
        <RowComponent>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SearchEvents', {
                isFilter: false,
              })}
            style={{ flex: 1 }}>
            <InputComponent
              styles={[globalStyles.shadow, { marginBottom: 0 }]}
              affix={
                <TouchableOpacity onPress={() => navigation.navigate('Explore', { screen: 'HomeScreen' })}>
                  <ArrowLeft2 size={20} color={appColors.text} />
                </TouchableOpacity>
              }
              placeholder='Search'
              value=''
              onChange={val => console.log(val)}
            />
          </TouchableOpacity>
          <SpaceComponent width={12} />
          <CardComponent
            onPress={moveToCurrentLocation}
            styles={[globalStyles.nospaceCard, globalStyles.card, globalStyles.shadow, { width: 50, height: 50 }]}
            bgColor='#FFFFFFB3'
          >
            <Gps size="28" color={appColors.primary} variant='Broken' />
          </CardComponent>
        </RowComponent>
        <CategoriesList />
      </View>

      {/* FlatList */}
      <View style={{
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
      }}>
        <FlatList
          initialScrollIndex={0}
          data={events}
          renderItem={({ item }) => (
            <EventItem item={item} type='list' />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default MapScreen;
