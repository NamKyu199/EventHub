import { View, Modal, TouchableOpacity } from 'react-native'
import React, { ReactNode, useRef, useState } from 'react'
import { ButtonComponent, InputComponent, RowComponent, SpaceComponent, TextComponent } from '~components'
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { Camera, Image, Link } from 'iconsax-react-native';
import { appColors } from '~constants/appColors';
import { fontFamililes } from '~constants/fontFamililes';
import ImagePicker, { ImageOrVideo, Options } from 'react-native-image-crop-picker';
import { globalStyles } from '~styles/globalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
    onSelect: (val: {
        type: 'url' | 'file',
        value: string | ImageOrVideo
    }) => void
}

const ButtonImagePicker = (props: Props) => {

    const { onSelect } = props;
    const modalizeRef = useRef<Modalize>();
    const [imgaeUrl, setImgaeUrl] = useState('');
    const [isVisibleModalAddRul, setIsVisibleModalAddRul] = useState(false);

    const options: Options = {
        cropping: true,
        mediaType: 'photo'
    }

    const choiceImages = [
        {
            key: 'camera',
            title: 'Take a picture',
            icon: <Camera size={22} color={appColors.text} />
        },
        {
            key: 'library',
            title: 'From library',
            icon: <Image size={22} color={appColors.text} />
        },
        {
            key: 'url',
            title: 'From url',
            icon: <Link size={22} color={appColors.text} />
        },
    ];

    const renderItem = (item: { icon: ReactNode, key: string, title: string }) => (
        <RowComponent styles={{ marginBottom: 20 }} onPress={() => handleChoiceImage(item.key)}>
            {item.icon}
            <SpaceComponent width={12} />
            <TextComponent text={item.title} flex={1} font={fontFamililes.medium} />
        </RowComponent>
    );

    const handleChoiceImage = (key: string) => {
        switch (key) {
            case 'library':
                ImagePicker.openPicker(options).then(res => {
                    onSelect({ type: 'file', value: res })
                })
                break
            case 'camera':
                ImagePicker.openCamera(options).then(res => {
                    onSelect({ type: 'file', value: res })
                })
                break
            default:
                setIsVisibleModalAddRul(true)
                break
        }

        modalizeRef.current?.close();
    }

    return (
        <View style={{ marginBottom: 20 }}>
            <ButtonComponent text='Upload image' onPress={() => modalizeRef.current?.open()} type='link' />
            <Portal>
                <Modalize
                    adjustToContentHeight
                    ref={modalizeRef}
                    handlePosition='inside'
                >
                    <View style={{ marginVertical: 30, paddingHorizontal: 20 }}>
                        {
                            choiceImages.map(item => renderItem(item))
                        }
                    </View>
                </Modalize>
            </Portal>
            <Modal
                visible={isVisibleModalAddRul}
                statusBarTranslucent
                style={{ flex: 1 }}
                transparent
                animationType='slide'
            >
                <View style={[globalStyles.container,
                {
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }]}>
                    <View style={{
                        backgroundColor: appColors.white,
                        margin: 20,
                        borderRadius: 12,
                        width: '90%',
                        padding: 20

                    }}>
                        <RowComponent justify='flex-end'>
                            <TouchableOpacity
                                onPress={() => {
                                    setImgaeUrl('')
                                    setIsVisibleModalAddRul(false)
                                }}
                            >
                                <AntDesign name='close' size={24} color={appColors.text} />
                            </TouchableOpacity>
                        </RowComponent>
                        <TextComponent text='Image URL' title size={18} />
                        <SpaceComponent height={12} />
                        <InputComponent
                            placeholder='URL'
                            value={imgaeUrl}
                            onChange={val => setImgaeUrl(val)}
                            allowClear
                        />
                        <RowComponent justify='flex-end'>
                            <ButtonComponent
                                type='link'
                                text='Agree'
                                onPress={() => {
                                    setIsVisibleModalAddRul(false);
                                    onSelect({ type: 'url', value: imgaeUrl });
                                    setImgaeUrl('');
                                }}
                            />
                        </RowComponent>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ButtonImagePicker