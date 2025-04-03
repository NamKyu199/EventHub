import React, { useEffect, useState, useCallback } from 'react';
import { EventModle } from '~models/EventModel';
import eventAPI from '~apis/eventApi';
import { CircleComponent, ContainerComponent, ListEventComponent, RowComponent, SectionComponent, TagComponent, TextComponent } from '~components';
import { SearchNormal1, Sort } from 'iconsax-react-native';
import { appColors } from '~constants/appColors';
import { LoadingModal } from '~modals';
import { useIsFocused } from '@react-navigation/native';
import { TextInput, View } from 'react-native';
import { globalStyles } from '~styles/globalStyles';
import { debounce } from 'lodash';

const SearchEvents = ({ navigation, route }: any) => {
    const { isFilter }: { isFilter: boolean } = route.params;
    const [events, setEvents] = useState<EventModle[]>([]);
    const [isLoadding, setIsLoadding] = useState(false);
    const isFocused = useIsFocused();
    const [searchKey, setSearchKey] = useState('');
    const [results, setResults] = useState<EventModle[]>([]);

    useEffect(() => {
        isFocused && getEvents();
    }, [isFocused]);

    // Khởi tạo hàm debounce một lần duy nhất
    const debouncedSearch = useCallback(
        debounce(async (value: string) => {
            await handleSearchEvent(value);
        }, 500),
        []
    );

    useEffect(() => {
        if (!searchKey) {
            setResults(events);
        } else {
            debouncedSearch(searchKey);
        }
    }, [searchKey]);

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
                                navigation.navigate("SearchEvents", {
                                    isFilter: true,
                                })
                            }
                        />
                    </RowComponent>
                </SectionComponent>
                {results.length > 0 ? (
                    <ListEventComponent items={results} />
                ) : (
                    !isLoadding && <TextComponent text="Không có sự kiện nào" />
                )}
                <LoadingModal visible={isLoadding} />
            </View>
        </ContainerComponent>
    );
};

export default SearchEvents;