import React, { useEffect, useState } from 'react';
import { ButtonComponent, ContainerComponent, ListEventComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '~components';
import { ArrowRight, More, SearchNormal1 } from 'iconsax-react-native';
import { appColors } from '~constants/appColors';
import { EventModle } from '~models/EventModel';
import eventAPI from '~apis/eventApi';
import { LoadingModal } from '~modals';
import { useIsFocused } from '@react-navigation/native';
import { Image, StatusBar, View } from 'react-native';
import appImage from '~constants/appImage';
import { appInfo } from '~constants/appInfos';
import { globalStyles } from '~styles/globalStyles';

const EventsScreen = ({ navigation }: any) => {
  const [events, setevents] = useState<EventModle[]>([]);
  const [isLoadding, setisLoadding] = useState(false);
  const isForcused = useIsFocused();

  useEffect(() => {
    isForcused && getEvents();
  }, [isForcused]);

  // Hàm lấy danh sách sự kiện
  const getEvents = async () => {
    if (events.length === 0) {
      setisLoadding(true);
    }
    try {
      const res = await eventAPI.HandleEvent('/get-event');
      if (res?.data) {
        setevents(res.data);
      }
    } catch (error) {
      console.error("❌ Lỗi khi lấy sự kiện:", error);
    } finally {
      setisLoadding(false);
    }
  };

  return (
    <ContainerComponent
      back
      title='Events'
      right={
        <RowComponent>
          <ButtonComponent

            icon={
              <SearchNormal1
                size={20}
                color={appColors.text}
                onPress={() =>
                  navigation.navigate('SearchEvents', {
                    isFilter: false,
                  })
                }
              />
            }
          />
          <StatusBar barStyle='dark-content' />
          <SpaceComponent width={12} />
          <ButtonComponent
            icon={
              <More
                size={20}
                color={appColors.text}
                style={{ transform: [{ rotate: '90deg' }] }}
                onPress={() => { }}
              />
            }
          />
        </RowComponent>
      }
    >
      {events.length > 0 ? (
        <ListEventComponent items={events} />
      ) : (
        !isLoadding && (
          <SectionComponent
            styles={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}
          >
            <SpaceComponent height={240} />
            <Image
              source={appImage.EmptyEvents}
              resizeMode="contain"
              style={{
                width: appInfo.size.WIDTH * 0.5,
                height: appInfo.size.HEIGHT * 0.25,
                marginBottom: 20,
              }}
            />
            <TextComponent
              text="Không có sự kiện nào"
              styles={{ fontSize: 18, fontWeight: 'bold', marginBottom: 6 }}
            />
            <TextComponent
              text="Hiện tại không có sự kiện nào để hiển thị."
              styles={{
                fontSize: 14,
                textAlign: 'center',
                color: '#555',
                width: appInfo.size.WIDTH * 0.8,
              }}
            />
            <SpaceComponent height={100} />
            <ButtonComponent
              onPress={() => navigation.navigate('ExploreEvents')}
              text='EXPLORE EVENTS'
              type='primary'
              iconFlex='right'
              icon={
                <View style={[globalStyles.iconContainer, { backgroundColor: appColors.primary }]}>
                  <ArrowRight size={20} color={appColors.white} />
                </View>
              }
            />
            <SpaceComponent height={20} />
          </SectionComponent>
        )
      )}
      <LoadingModal visible={isLoadding} />
    </ContainerComponent>
  );
};

export default EventsScreen;