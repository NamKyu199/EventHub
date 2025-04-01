import { FlatList } from 'react-native';
import React from 'react';
import { EventModle } from '~models/EventModel';
import EventItem from './EventItem';
import { appInfo } from '~constants/appInfos';
import SectionComponent from './SectionComponent';

interface Props {
    items: EventModle[];
}

const ListEventComponent = ({ items }: Props) => {
    return (
        <FlatList
            data={items}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <EventItem
                    item={item}
                    type='list'
                    styles={{ flex: 1, width: undefined }}
                />
            )}
        />
    );
}

export default ListEventComponent;