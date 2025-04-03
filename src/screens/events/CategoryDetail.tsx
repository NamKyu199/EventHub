import React, { useEffect, useState } from 'react'
import eventAPI from '~apis/eventApi';
import { ContainerComponent, SectionComponent, TextComponent } from '~components';
import { LoadingModal } from '~modals';
import { EventModle } from '~models/EventModel';

const CategoryDetail = ({ navigation, route }: any) => {
  const { id, title }: { id: string, title: string } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<EventModle[]>([]);

  useEffect(() => {
    if (id) getData();
  }, [id]);

  const getData = async () => {
    setIsLoading(true);
    await getEventsById();
    setIsLoading(false);
  }

  const getEventsById = async () => {
    const api = `/get-events-category?id=${id}`;

    try {
      const res = await eventAPI.HandleEvent(api);
      console.log("API response:", res);  // Log toàn bộ response để kiểm tra

      if (res && res.data) {
        setEvents(res.data); // Cập nhật trạng thái events
      } else {
        console.log('No events data returned');
      }
    } catch (error) {
      console.log('Error fetching events:', error);
    }
  };

  return (
    <ContainerComponent back isScroll={false} title={title}>
      <SectionComponent>
        {events.length > 0 ? (
          events.map((event, index) => (
            <TextComponent key={index} text={event.title} />
          ))
        ) : (
          <TextComponent text="No events found for this category." />
        )}
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  )
}

export default CategoryDetail;