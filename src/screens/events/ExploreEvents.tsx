import React, { useEffect, useState } from 'react';
import { ButtonComponent, ContainerComponent, ListEventComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '~components';
import { More, SearchNormal1 } from 'iconsax-react-native';
import { appColors } from '~constants/appColors';
import { EventModle } from '~models/EventModel';
import eventAPI from '~apis/eventApi';
import { LoadingModal } from '~modals';
import { useIsFocused } from '@react-navigation/native';
import { Image } from 'react-native';
import appImage from '~constants/appImage';
import { appInfo } from '~constants/appInfos';

const ExploreEvents = ({ navigation, route }: any) => {
    const [events, setevents] = useState<EventModle[]>([]);
    const [isLoadding, setisLoadding] = useState(false);
    const isForcused = useIsFocused();
    const [filterCondition, setFilterCondition] = useState<{
        title: string;
        key: string
    }>();

    useEffect(() => {
        isForcused && getEvents();
    }, [isForcused]);

    useEffect(() => {
        if (route.params) {
            setFilterCondition(route.params);
        }
    }, [route])

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
            title={filterCondition ? filterCondition.title : 'Events'}
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
                    </SectionComponent>
                )
            )}
            <LoadingModal visible={isLoadding} />
        </ContainerComponent>
    );
};

export default ExploreEvents;