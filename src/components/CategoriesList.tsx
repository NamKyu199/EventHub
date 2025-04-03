import { View, Text, FlatList } from 'react-native';
import React, { ReactNode, useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../styles/globalStyles';
import { appColors } from '../constants/appColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ChefFork, Food } from '~constants/svg';
import { TagComponent } from '~components';
import { Category } from '~models/Category';
import eventAPI from '~apis/eventApi';
import { useNavigation } from '@react-navigation/native';

interface Props {
    isColor?: boolean;
}

const CategoriesList = (props: Props) => {
    const { isColor } = props;

    const [categories, setCategories] = useState<Category[]>([]);
    const navigation: any = useNavigation();

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        const api = `/get-categories`;
        try {
            const res = await eventAPI.HandleEvent(api);
            setCategories(res.data);
        } catch (error) {
            console.log('Lấy dữ liệu Categories không thành công:', error);
        }
    };

    const renderIconCategories = (key: string) => {
        let icon: ReactNode = <></>;

        switch (key) {
            case 'sports':
                icon = (
                    <Ionicons
                        name="basketball"
                        size={20}
                        color={isColor ? appColors.white : '#EE544A'}
                    />
                );
                break;
            case 'music':
                icon = (
                    <FontAwesome
                        name="music"
                        size={20}
                        color={isColor ? appColors.white : '#F59762'}
                    />
                );
                break;
            case 'food':
                icon = isColor ? (
                    <ChefFork color={isColor ? appColors.white : '#29D697'} />
                ) : (
                    <Food color={isColor ? appColors.white : '#29D697'} />
                );
                break;
            case 'art':
                icon = (
                    <Ionicons
                        name="color-palette-sharp"
                        size={20}
                        color={isColor ? appColors.white : '#46CDFB'}
                    />
                );
                break;
            default:
                icon = (
                    <Ionicons
                        name="help-circle-outline"
                        size={20}
                        color={isColor ? appColors.white : '#888'}
                    />
                );
                break;
        }

        return icon;
    };

    return (
        categories.length > 0 ? (
            <FlatList
                style={{ paddingHorizontal: 16 }}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={categories}
                keyExtractor={(item) => item._id} // Use _id for key extraction
                renderItem={({ item, index }) => (
                    <TagComponent
                        styles={[globalStyles.shadow, { marginRight: index === categories.length - 1 ? 28 : 12, minWidth: 82 }]}
                        bgColor={isColor ? item.color : appColors.white}
                        onPress={() => navigation.navigate('CategoryDetail', {
                            id: item._id,
                            title: item.title
                        })}
                        lable={item.title}
                        icon={renderIconCategories(item.key)} // Pass icon from renderIconCategories
                        textColor={isColor ? appColors.white : appColors.text}
                    />
                )}
            />
        ) : <></>
    );
};

export default CategoriesList;
