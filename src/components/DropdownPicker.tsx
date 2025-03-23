import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { SelectModel } from '~models/SelectModel';
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';
import { ArrowDown2, SearchNormal1 } from 'iconsax-react-native';
import { appColors } from '~constants/appColors';
import { globalStyles } from '~styles/globalStyles';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import InputComponent from './InputComponent';
import ButtonComponent from './ButtonComponent';
import SpaceComponent from './SpaceComponent';
import { fontFamililes } from '~constants/fontFamililes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
    label?: string;
    values: SelectModel[];
    selected?: string | string[];
    onSelect: (val: string | string[]) => void;
    mutible?: boolean;
}

const DropdownPicker = ({ label, values, selected = [], onSelect, mutible }: Props) => {
    const [searchKey, setSearchKey] = useState('');
    const [isVisibleModalize, setIsVisibleModalize] = useState(false);
    const modalieRef = useRef<Modalize>(null);
    const [selectedItems, setSelectedItems] = useState<string[]>(
        Array.isArray(selected) ? selected : selected ? [selected] : []
    );

    useEffect(() => {
        setSelectedItems(Array.isArray(selected) ? selected : selected ? [selected] : []);
    }, [selected]);

    useEffect(() => {
        if (isVisibleModalize) {
            modalieRef.current?.open();
        }
    }, [isVisibleModalize]);

    const handleSelectItem = (id: string) => {
        if (!mutible) {
            setSelectedItems([id]);
            onSelect(id);
            modalieRef.current?.close();
            return;
        }

        setSelectedItems(prevSelectedItems => {
            const updatedSelectedItems = prevSelectedItems.includes(id)
                ? prevSelectedItems.filter(item => item !== id)
                : [...prevSelectedItems, id];
            onSelect(updatedSelectedItems);
            return updatedSelectedItems;
        });
    };

    const renderSelectedItem = (id: string) => {
        const item = values.find(element => element.value === id);
        if (!item) return null;

        return (
            <RowComponent key={id} styles={localStyles.selectedItem}>
                <TextComponent text={item.label} color={appColors.primary} />
                <SpaceComponent width={8} />
                <TouchableOpacity onPress={() => handleSelectItem(id)}>
                    <AntDesign name='close' size={18} color={appColors.text} />
                </TouchableOpacity>
            </RowComponent>
        );
    };

    const filteredValues = useMemo(() => {
        return values.filter(item => item.label.toLowerCase().includes(searchKey.toLowerCase()));
    }, [values, searchKey]);

    return (
        <View>
            {label && <TextComponent text={label} styles={{ marginBottom: 12 }} />}
            <RowComponent styles={[globalStyles.inputcontainer, { alignItems: 'center' }]} onPress={() => setIsVisibleModalize(true)}>
                <RowComponent styles={{ flex: 1, flexWrap: 'wrap' }}>
                    {selectedItems.length > 0 ? selectedItems.map(renderSelectedItem) : <TextComponent text='Select' />}
                </RowComponent>
                <ArrowDown2 size={22} color={appColors.gray} />
            </RowComponent>
            <Portal>
                <Modalize
                    handlePosition='outside'
                    ref={modalieRef}
                    FooterComponent={
                        mutible && (
                            <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
                                <ButtonComponent text='Agree' type='primary' onPress={() => modalieRef.current?.close()} />
                            </View>
                        )
                    }
                    scrollViewProps={{ showsVerticalScrollIndicator: false }}
                    onClose={() => setIsVisibleModalize(false)}
                    HeaderComponent={
                        <RowComponent styles={{ marginBottom: 12, paddingHorizontal: 20, paddingVertical: 20 }}>
                            <View style={{ flex: 1 }}>
                                <InputComponent
                                    styles={{ marginBottom: 0 }}
                                    placeholder='Search....'
                                    value={searchKey}
                                    onChange={setSearchKey}
                                    allowClear
                                    affix={<SearchNormal1 size={22} color={appColors.gray} />}
                                />
                            </View>
                            <SpaceComponent width={12} />
                            <ButtonComponent type='link' text='Cancel' onPress={() => modalieRef.current?.close()} />
                        </RowComponent>
                    }
                >
                    <View style={{ paddingHorizontal: 20 }}>
                        {filteredValues.map(item => (
                            <RowComponent
                                key={item.value}
                                styles={localStyles.listItem}
                                onPress={() => handleSelectItem(item.value)}
                            >
                                <TextComponent
                                    text={item.label}
                                    flex={1}
                                    font={selectedItems.includes(item.value) ? fontFamililes.medium : fontFamililes.regular}
                                    color={selectedItems.includes(item.value) ? appColors.primary : appColors.text}
                                />
                                {selectedItems.includes(item.value) && (
                                    <MaterialCommunityIcons name='checkbox-marked-circle-outline' size={22} color={appColors.primary} />
                                )}
                            </RowComponent>
                        ))}
                    </View>
                </Modalize>
            </Portal>
        </View>
    );
};

export default DropdownPicker;

const localStyles = StyleSheet.create({
    listItem: {
        marginBottom: 20,
    },
    selectedItem: {
        borderWidth: 0.5,
        borderColor: appColors.gray,
        padding: 4,
        marginBottom: 8,
        marginRight: 8,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
});