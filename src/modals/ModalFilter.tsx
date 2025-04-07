import { ArrowRight2, Calendar } from 'iconsax-react-native';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import eventAPI from '~apis/eventApi';
import {
    ButtonComponent,
    ChoiceLocation,
    RowComponent,
    SectionComponent,
    SpaceComponent,
    TextComponent
} from '~components';
import { appColors } from '~constants/appColors';
import { appInfo } from '~constants/appInfos';
import { fontFamililes } from '~constants/fontFamililes';
import { ChefFork, Food } from '~constants/svg';
import { Category } from '~models/Category';
import { authSelector, AuthState } from '~redux/reducers/authReducer';
import { globalStyles } from '~styles/globalStyles';
import ModalLocation from './ModalLocation';

interface Props {
    visible: boolean,
    onClose: () => void;
    seletected?: string[];
    onFilter: (values: {
        categories: string[]
    }) => void
}

const ModalFilter = (props: Props) => {
    const { visible, onClose, seletected, onFilter } = props;
    const auth: AuthState = useSelector(authSelector);
    const modalizeRef = useRef<Modalize>();
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(seletected || []);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [isVisibleModalDate, setIsVisibleModalDate] = useState(false);
    const [pickedDate, setPickedDate] = useState<Date | null>(null);

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        if (visible && modalizeRef.current) {
            modalizeRef.current.open();
        } else if (modalizeRef.current) {
            modalizeRef.current.close();
        }
    }, [visible]);

    const getCategories = async () => {
        const api = `/get-categories`;
        try {
            const res = await eventAPI.HandleEvent(api);
            setCategories(res.data);
        } catch (error) {
            console.log('Lấy dữ liệu Categories không thành công:', error);
        }
    };

    const handleSelectCategory = (id: string) => {
        if (selectedCategories.includes(id)) {
            setSelectedCategories(prev => prev.filter(item => item !== id));
        } else {
            setSelectedCategories(prev => [...prev, id]);
        }
    };

    const renderIconCategories = (key: string, isSelected: boolean) => {
        switch (key) {
            case 'sports':
                return (
                    <Ionicons
                        name="basketball"
                        size={25}
                        color={isSelected ? appColors.white : '#EE544A'}
                    />
                );
            case 'music':
                return (
                    <FontAwesome
                        name="music"
                        size={25}
                        color={isSelected ? appColors.white : '#F59762'}
                    />
                );
            case 'food':
                return isSelected ? (
                    <ChefFork color={appColors.white} />
                ) : (
                    <Food color={'#29D697'} />
                );
            case 'art':
                return (
                    <Ionicons
                        name="color-palette-sharp"
                        size={25}
                        color={isSelected ? appColors.white : '#46CDFB'}
                    />
                );
            default:
                return (
                    <Ionicons
                        name="help-circle-outline"
                        size={30}
                        color={isSelected ? appColors.white : '#888'}
                    />
                );
        }
    };

    const renderDateOption = (label: string) => {
        const isSelected = selectedDate === label;
        return (
            <TouchableOpacity
                onPress={() => setSelectedDate(label)}
                style={[
                    globalStyles.button,
                    {
                        borderWidth: 1,
                        borderColor: appColors.gray2,
                        borderRadius: 12,
                        paddingHorizontal: 20,
                        paddingVertical: 12,
                        backgroundColor: isSelected ? appColors.primary : appColors.white,
                        marginLeft: label !== 'Today' ? 20 : 0,
                    }
                ]}
            >
                <TextComponent
                    text={label}
                    color={isSelected ? appColors.white : appColors.gray}
                    font={fontFamililes.medium}
                />
            </TouchableOpacity>
        );
    };

    const handleFilter = () => {
        onFilter({
            categories: selectedCategories
        });
        modalizeRef.current?.close(); // ✅ Đóng modalize sau khi apply
    };

    return (
        <>
            <Portal>
                <Modalize
                    adjustToContentHeight
                    handlePosition='inside'
                    ref={modalizeRef}
                    onClose={onClose}
                >
                    <SectionComponent styles={{ padding: 30 }}>
                        <TextComponent text='Filter' size={16} />
                    </SectionComponent>

                    {categories.length > 0 && (
                        <FlatList
                            style={{ paddingHorizontal: 16, marginBottom: 16 }}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={categories}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item, index }) => {
                                const isSelected = selectedCategories.includes(item._id);
                                return (
                                    <View style={{
                                        alignItems: 'center',
                                        marginRight: index === categories.length - 1 ? 28 : 5,
                                        marginLeft: 30
                                    }}>
                                        <TouchableOpacity
                                            key={item._id}
                                            style={{
                                                backgroundColor: isSelected ? item.color : appColors.white,
                                                borderWidth: 1,
                                                borderColor: item.color,
                                                borderRadius: 100,
                                                padding: 10,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                minWidth: 50,
                                                height: 50,
                                            }}
                                            onPress={() => handleSelectCategory(item._id)}
                                        >
                                            {renderIconCategories(item.key, isSelected)}
                                        </TouchableOpacity>
                                        <TextComponent
                                            text={item.title}
                                            size={13}
                                            styles={{ marginTop: 6, textAlign: 'center' }}
                                        />
                                    </View>
                                );
                            }}
                        />
                    )}

                    <SectionComponent>
                        <TextComponent text='Date time' font={fontFamililes.medium} size={16} />
                        <RowComponent styles={{ marginTop: 16, marginBottom: 12 }}>
                            {renderDateOption('Today')}
                            {renderDateOption('Tomorrow')}
                            {renderDateOption('This week')}
                        </RowComponent>
                        <TouchableOpacity
                            style={[
                                {
                                    borderWidth: 1,
                                    borderColor: appColors.gray2,
                                    borderRadius: 12,
                                    paddingHorizontal: 20,
                                    paddingVertical: 12,
                                    backgroundColor: appColors.white,
                                    width: appInfo.size.WIDTH * 0.7,
                                    marginLeft: 10,
                                }
                            ]}
                        >
                            <RowComponent justify='space-between' onPress={() => setIsVisibleModalDate(true)}>
                                <Calendar
                                    size="25"
                                    color={appColors.primary}
                                    variant="Bulk"
                                />
                                <TextComponent
                                    text={
                                        pickedDate
                                            ? pickedDate.toLocaleDateString('vi-VN', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })
                                            : 'Choose from calender'
                                    }
                                    color={pickedDate ? appColors.text : appColors.gray}
                                    font={fontFamililes.medium}
                                    size={15}
                                />
                                <ArrowRight2
                                    size="20"
                                    color={appColors.primary}
                                    variant='Bold'
                                    style={{ marginTop: 2 }}
                                />
                            </RowComponent>
                        </TouchableOpacity>
                    </SectionComponent>

                    <SectionComponent>
                        <RowComponent styles={{ marginHorizontal: 20 }}>
                            <ButtonComponent
                                color={appColors.white}
                                text='Reset'
                                type='primary'
                                textColor={appColors.text}
                                onPress={() => {
                                    setSelectedCategories([])
                                }}
                            />
                            <ButtonComponent
                                text='Apply'
                                type='primary'
                                onPress={handleFilter}
                            />
                        </RowComponent>
                    </SectionComponent>
                </Modalize>
            </Portal>

            <DatePicker
                mode="date"
                open={isVisibleModalDate}
                date={new Date()}
                modal
                locale="vi"
                onCancel={() => setIsVisibleModalDate(false)}
                onConfirm={(val) => {
                    setPickedDate(val);
                    setIsVisibleModalDate(false);
                }}
            />
        </>
    );
};

export default ModalFilter;