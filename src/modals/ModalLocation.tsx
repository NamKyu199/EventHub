import { View, Modal, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ButtonComponent, InputComponent, RowComponent, SpaceComponent, TextComponent } from '~components';
import { appColors } from '~constants/appColors';
import { SearchNormal1 } from 'iconsax-react-native';
import axios from 'axios';
import { LocationModel } from '~models/LocationModel';
import MapView, { Marker } from 'react-native-maps';
import GeoLocation from '@react-native-community/geolocation';
import { appInfo } from '~constants/appInfos';
import GeoCoder from 'react-native-geocoding';

GeoCoder.init(process.env.MAP_API_KEY as string)

interface Props {
    visible: boolean;
    onClose: () => void;
    onSelect: (val: {
        address: string,
        position?: {
            lat: number,
            long: number
        }
    }) => void;
}

const ModalLocation = ({ visible, onClose, onSelect }: Props) => {
    const [searchKey, setSearchKey] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [locations, setLocations] = useState<LocationModel[]>([]);
    const [addressSelected, setAddressSelected] = useState('');
    const [currentLocation, setCurrentLocation] = useState<{ lat: number; long: number } | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        GeoLocation.getCurrentPosition(
            (position) => {
                if (position.coords) {
                    setCurrentLocation({
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                    });
                }
            },
            (error) => {
                setError('Failed to get location');
                console.error('Location Error:', error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }, []);

    useEffect(() => {
        GeoCoder.from(addressSelected).then(res => {
            const position = res.results[0].geometry.location;
            setCurrentLocation({
                lat: position.lat,
                long: position.lng,
            })
        })
    }, [addressSelected])

    useEffect(() => {
        if (!searchKey) {
            setLocations([]);
        }
    }, [searchKey]);

    const handleSearchLocation = async () => {
        if (!searchKey.trim()) return;

        const api = `https://revgeocode.search.hereapi.com/v1/autocomplete?q=${searchKey}&limit=10&apikey=1lI5kNe7xVRqbwGlWQpct5_eQCDzWWPOdl5z-VWJHkA`;
        try {
            setIsLoading(true);
            const res = await axios.get(api);
            if (res.status === 200 && res.data.items) {
                setLocations(res.data.items);
            } else {
                setLocations([]);
            }
        } catch (err) {
            console.error('API Error:', err);
            setError('Error fetching locations');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
            <View style={{ paddingVertical: 22 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <RowComponent justify="flex-end">
                        <View style={{ flex: 1 }}>
                            <InputComponent
                                styles={{ marginBottom: 0 }}
                                affix={<SearchNormal1 size={20} color={appColors.gray} />}
                                placeholder="Search"
                                value={searchKey}
                                allowClear
                                onChange={setSearchKey}
                                onEnd={handleSearchLocation}
                                numberOfLines={1}
                            />
                        </View>
                        <View style={{ position: 'absolute', top: 66, right: 10, left: 10, backgroundColor: appColors.white, zIndex: 5 }}>
                            {isLoading ? (
                                <ActivityIndicator />
                            ) : error ? (
                                <TextComponent text={error} />
                            ) : locations.length > 0 ? (
                                <FlatList
                                    data={locations}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={{ marginBottom: 12 }}
                                            onPress={() => {
                                                setAddressSelected(item.address.label); // Cập nhật địa chỉ đúng
                                                setSearchKey('');
                                            }}
                                        >
                                            <TextComponent text={item.address.label} />
                                        </TouchableOpacity>
                                    )}
                                />
                            ) : (
                                <View style={{ paddingBottom: 10 }}>
                                    <TextComponent text={searchKey ? 'Location not found' : 'Search location'} />
                                </View>
                            )}
                        </View>
                        <SpaceComponent width={12} />
                        <ButtonComponent text="Cancel" type="link" onPress={onClose} />
                    </RowComponent>
                    {currentLocation && (
                        <MapView
                            style={{ zIndex: -1, width: '100%', height: appInfo.size.HEIGHT * 0.5, marginVertical: 50 }}
                            showsMyLocationButton
                            showsUserLocation
                            initialRegion={{
                                latitude: currentLocation.lat,
                                longitude: currentLocation.long,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            region={{
                                latitude: currentLocation.lat,
                                longitude: currentLocation.long,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            mapType='standard'
                        />
                    )}
                    <ButtonComponent
                        text="Confirm"
                        type="primary"
                        onPress={() => {
                            onSelect({
                                address: addressSelected || "Địa chỉ không xác định", // Sử dụng địa chỉ đã chọn
                                position: currentLocation ?? undefined,
                            });
                            onClose();
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default ModalLocation;
