import React, { useEffect, useState } from 'react';
import { ButtonComponent, ContainerComponent, ListEventComponent, RowComponent, SpaceComponent, TextComponent } from '~components';
import { More, SearchNormal1 } from 'iconsax-react-native';
import { appColors } from '~constants/appColors';
import { EventModle } from '~models/EventModel';
import eventAPI from '~apis/eventApi';
import { LoadingModal } from '~modals';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'react-native';

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
        !isLoadding && <TextComponent text="Không có sự kiện nào" />
      )}
      <LoadingModal visible={isLoadding} />
    </ContainerComponent>
  );
};

export default EventsScreen;