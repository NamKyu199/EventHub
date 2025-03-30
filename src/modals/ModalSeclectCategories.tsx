import React, { useEffect, useRef, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ChefFork, Food } from '~constants/svg';
import { appColors } from '~constants/appColors';
import { Category } from '~models/Category';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import { ButtonComponent, RowComponent, SectionComponent, TextComponent } from '~components';
import eventAPI from '~apis/eventApi';
import { TouchableOpacity } from 'react-native';
import { globalStyles } from '~styles/globalStyles';
import { authSelector, AuthState } from '~redux/reducers/authReducer';
import { useSelector } from 'react-redux';
import userAPI from '~apis/userApi';

interface Props {
    visible: boolean,
    onClose: () => void;
    onSelected: (vals: string[]) => void;
    seletected?: string[];
}

const ModalSeclectCategories = (props: Props) => {
    const { visible, onClose, onSelected, seletected } = props
    const auth: AuthState = useSelector(authSelector);
    const [categories, setCategories] = useState<Category[]>([]);
    const modalizeRef = useRef<Modalize>();
    const [catsSelected, setCatsSelected] = useState<string[]>(seletected ?? []);

    useEffect(() => {
        getCategories();
    }, [])

    useEffect(() => {
        if (visible && modalizeRef.current) {
            modalizeRef.current.open();
        } else if (modalizeRef.current) {
            modalizeRef.current.close();
        }
    }, [visible]);

    useEffect(() => {
        onSelected(catsSelected)
    }, [catsSelected])

    const handleCategories = async (item: any) => {
        const api = `/creat-category`;
        try {
            const res = await eventAPI.HandleEvent(api, {
                title: item.title,
                key: item.key,
                color: item.iconColor,
                description: "Danh mục sự kiện"
            }, 'post');
            console.log(res);
        } catch (error) {
            console.log('Lỗi không thể tạo thành công Category:', error);
        }
    };

    const getCategories = async () => {
        const api = `/get-categories`;
        try {
            const res = await eventAPI.HandleEvent(api);
            // Kiểm tra phản hồi từ API
            if (res?.data) {
                setCategories(res.data); // Cập nhật state categories
            } else {
                console.log("Phản hồi API không hợp lệ:", res);
            }
        } catch (error) {
            console.log("Lỗi lấy danh sách categories:", error);
        }
    };

    const onSelectedCategory = (id: string) => {
        const items = [...catsSelected];
        const index = items.findIndex(element => element === id);

        if (index !== -1) {
            items.splice(index, 1);
        } else {
            items.push(id);
        }

        setCatsSelected(items);
    };

    // Chỉ gọi onSelected khi nhấn "Agree"
    const handleUpdateInterests = async () => {
        const api = `/update-interests?uid=${auth.id}`;

        try {
            const response = await userAPI.HandleUser(api, catsSelected, 'put');
            onSelected(catsSelected); // Chỉ gọi onSelected ở đây
            onClose(); // Đóng modal sau khi nhấn Agree
        } catch (error) {
            console.error("Lỗi cập nhật sở thích:", error);
        }
    };

    return (
        <Portal>
            <Modalize
                adjustToContentHeight
                handlePosition='inside'
                ref={modalizeRef}
                onClose={onClose}
            >
                <SectionComponent styles={{ padding: 30 }}>
                    <RowComponent>
                        {categories.length > 0 ? (
                            categories.map(category => (
                                <TouchableOpacity
                                    key={category._id}
                                    onPress={() => onSelectedCategory(category._id)}
                                    style={[globalStyles.shadow, globalStyles.center, {
                                        backgroundColor: appColors.white,
                                        padding: 12,
                                        borderRadius: 12,
                                        marginBottom: 10,
                                        marginRight: 10,
                                        minWidth: 80,
                                        borderWidth: 2,
                                        borderColor: catsSelected?.includes(category._id)
                                            ? appColors.primary
                                            : appColors.white
                                    }]}>
                                    <TextComponent text={category.title} color={appColors.text} />
                                </TouchableOpacity>
                            ))
                        ) : (
                            <TextComponent text="Không có danh mục nào" />
                        )}
                    </RowComponent>
                </SectionComponent>
                <SectionComponent>
                    <ButtonComponent
                        text='Agree'
                        type='primary'
                        onPress={handleUpdateInterests}
                    />
                </SectionComponent>
            </Modalize>
        </Portal>
    )
}

export default ModalSeclectCategories