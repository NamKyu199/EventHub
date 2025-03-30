import { View, Text, FlatList } from 'react-native';
import React, { ReactNode } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../styles/globalStyles';
import { appColors } from '../constants/appColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ChefFork, Food } from '~constants/svg';
import { TagComponent, } from '~components';
import { Category } from '~models/Category';

interface Props {
    isColor?: boolean;
}

const CategoriesList = (props: Props) => {
    const { isColor } = props;

    const categories: Category[] = [
        {
            key: 'sports',
            icon: (
                <Ionicons
                    name="basketball"
                    size={20}
                    color={isColor ? appColors.white : '#EE544A'}
                />
            ),
            iconColor: '#EE544A',
            title: 'Sports',
        },
        {
            key: 'music',
            icon: (
                <FontAwesome
                    name="music"
                    size={20}
                    color={isColor ? appColors.white : '#F59762'}
                />
            ),
            iconColor: '#F59762',
            title: 'Music',
        },
        {
            key: 'food',
            icon: isColor ? <ChefFork color={isColor ? appColors.white : '#29D697'} /> : <Food color={isColor ? appColors.white : '#29D697'} />,
            iconColor: '#29D697',
            title: 'Food',
        },
        {
            key: 'art',
            icon: (
                <Ionicons
                    name="color-palette-sharp"
                    size={20}
                    color={isColor ? appColors.white : '#46CDFB'}
                />
            ),
            iconColor: '#46CDFB',
            title: 'Art',
        },
    ];

    return (
        <FlatList
            style={{ paddingHorizontal: 16 }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={categories}
            keyExtractor={(item) => item.key}
            renderItem={({ item, index }) => (
                <TagComponent
                    styles={[globalStyles.shadow, { marginRight: index === categories.length - 1 ? 28 : 12, minWidth: 82 }]}
                    bgColor={isColor ? item.iconColor : appColors.white}
                    onPress={() => { }}
                    icon={item.icon}
                    lable={item.title}
                    textColor={isColor ? appColors.white : appColors.text}
                />
            )}
        />

    );
};

export default CategoriesList;