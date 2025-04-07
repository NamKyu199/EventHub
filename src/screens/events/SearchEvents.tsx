import React, { useEffect, useState, useCallback } from 'react';
import { EventModle } from '~models/EventModel';
import eventAPI from '~apis/eventApi';
import { CircleComponent, ContainerComponent, ListEventComponent, RowComponent, SectionComponent, SpaceComponent, TagComponent, TextComponent } from '~components';
import { SearchNormal1, Sort } from 'iconsax-react-native';
import { appColors } from '~constants/appColors';
import { LoadingModal, ModalFilter } from '~modals';
import { useIsFocused } from '@react-navigation/native';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '~styles/globalStyles';
import { debounce } from 'lodash';
import appImage from '~constants/appImage';
import { appInfo } from '~constants/appInfos';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SearchEvents = ({ navigation, route }: any) => {
    const { isFilter } = route.params;
    const [events, setEvents] = useState<EventModle[]>([]);
    const [isLoadding, setIsLoadding] = useState(false);
    const isFocused = useIsFocused();
    const [searchKey, setSearchKey] = useState('');
    const [results, setResults] = useState<EventModle[]>([]);
    const [isVisibleModalFilter, setIsVisibleModalFilter] = useState(false);

    useEffect(() => {
        isFocused && getEvents();
    }, [isFocused]);

    useEffect(() => {
        if (isFilter) {
            console.log('Data Search', isFilter)
        }
    }, [isFilter])

    useEffect(() => {
        if (!searchKey) {
            setResults(events);
        } else {
            debouncedSearch(searchKey);
        }
    }, [searchKey]);

    const debouncedSearch = useCallback(
        debounce(async (value: string) => {
            await handleSearchEvent(value);
        }, 500),
        []
    );

    // Hàm lấy tất cả sự kiện
    const getEvents = async () => {
        setIsLoadding(true);
        try {
            const res = await eventAPI.HandleEvent('/get-event');
            if (res?.data) {
                setEvents(res.data);
                setResults(res.data);
            }
        } catch (error) {
            console.error("❌ Lỗi khi lấy sự kiện:", error);
        } finally {
            setIsLoadding(false);
        }
    };

    // Hàm tìm kiếm sự kiện theo từ khóa
    const handleSearchEvent = async (value: string) => {
        const api = `/get-search-events?title=${value}`;

        try {
            const res = await eventAPI.HandleEvent(api);
            setResults(res.data);
        } catch (error) {
            console.error("❌ Lỗi khi tìm kiếm sự kiện:", error);
        }
    };

    return (
        <ContainerComponent back title='Search' isScroll={false}>
            <View style={{ flex: 1 }}>
                <SectionComponent>
                    <RowComponent styles={{ borderWidth: 1, borderColor: appColors.gray2, borderRadius: 100, paddingHorizontal: 8 }}>
                        <RowComponent
                            styles={{ flex: 1 }}
                            onPress={() =>
                                navigation.navigate('SearchEvents', {
                                    isFilter: false,
                                })
                            }>
                            <SearchNormal1
                                variant='TwoTone'
                                size={18}
                                color={appColors.primary}
                            />
                            <View
                                style={{
                                    width: 1,
                                    height: 14,
                                    marginHorizontal: 12,
                                    backgroundColor: appColors.primary,
                                }}
                            />
                            <TextInput
                                placeholder='Search...'
                                value={searchKey}
                                onChangeText={val => setSearchKey(val)}
                                placeholderTextColor={appColors.gray}
                                style={[globalStyles.text, { flex: 1 }]}
                            />
                            <TouchableOpacity
                                onPress={() => setSearchKey('')}
                            >
                                <AntDesign name="close" size={16} color={appColors.gray} />
                            </TouchableOpacity>
                            <SpaceComponent width={12} />
                        </RowComponent>

                        <TagComponent
                            lable="Filters"
                            icon={
                                <CircleComponent size={20} color={appColors.white}>
                                    <Sort size={16} color={appColors.primary} />
                                </CircleComponent>
                            }
                            bgColor={appColors.primary}
                            onPress={() =>
                                setIsVisibleModalFilter(true)
                            }
                        />
                    </RowComponent>
                </SectionComponent>
                {results.length > 0 ? (
                    <ListEventComponent items={results} />
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
                                text="Không tìm thấy sự kiện nào với tên như vậy. Vui lòng thử lại với từ khóa khác."
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
            </View>
            <ModalFilter
                visible={isVisibleModalFilter}
                onFilter={vals => console.log(vals)}
                onClose={() => setIsVisibleModalFilter(false)} />
        </ContainerComponent>
    );
};

export default SearchEvents;