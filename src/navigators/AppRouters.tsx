import React, { useEffect, useState } from 'react'
import MainNavigator from './MainNavigator'
import AuthNavigator from './AuthNavigator'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { addAuth, authSelector, AuthState } from '~redux/reducers/authReducer'
import { SplashScreen } from '~screens'
import { UserHandle } from '~utils/UserHandlers'

const AppRouters = () => {
    const [isShowSplash, setIsShowSplash] = useState(true);
    const { getItem } = useAsyncStorage('auth');
    const auth: AuthState = useSelector(authSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        handleGetDatas();
    }, []);

    useEffect(() => {
        UserHandle.getFollowersById(auth.id, dispatch);
    }, [auth.id]);

    const handleGetDatas = async () => {
        await checkLogin();

        setIsShowSplash(false);
    }

    const checkLogin = async () => {
        const res = await getItem();
        if (res) {
            const parsedData = JSON.parse(res);
            dispatch(addAuth(parsedData));
        } else {
            console.log("❌ Không có dữ liệu auth trong AsyncStorage");
        }

        setIsShowSplash(false); // Đảm bảo luôn cập nhật state
    };

    return (
        <>
            {isShowSplash ?
                <SplashScreen /> : auth.accesstoken !== '' ?
                    <MainNavigator /> : <AuthNavigator />}
        </>
    )
}

export default AppRouters