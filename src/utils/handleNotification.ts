// handleNotification.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp } from '@react-native-firebase/app';
import { getMessaging, getToken, requestPermission } from '@react-native-firebase/messaging';
import userAPI from '~apis/userApi';

export class HandleNotification {
    // Cấp quyền thông báo
    static checkNotificationPermission = async () => {
        try {
            const app = getApp(); // Lấy app instance
            const messaging = getMessaging(app); // Sử dụng hàm mới

            const authStatus = await requestPermission(messaging);

            if (authStatus === 1 || authStatus === 2) {
                await this.getFcmToken();
            }
        } catch (error) {
            console.error("❌ Lỗi cấp quyền thông báo:", error);
        }
    };

    // Lấy FCM Token
    static getFcmToken = async () => {
        try {
            const fcmTokens = await AsyncStorage.getItem('fcmtoken');

            if (!fcmTokens) {
                const app = getApp();
                const messaging = getMessaging(app); // Dùng hàm mới
                const token = await getToken(messaging); // Lấy token với cú pháp mới

                if (token) {
                    await AsyncStorage.setItem('fcmtoken', token);
                    this.upDateTokenForUser(token);
                }
            } else {
                this.upDateTokenForUser(fcmTokens);
            }
        } catch (error) {
            console.error("❌ Lỗi lấy FCM token:", error);
        }
    };

    // Cập nhật token cho người dùng
    static upDateTokenForUser = async (token: string) => {
        try {
            const res = await AsyncStorage.getItem('auth');
            if (res) {
                const auth = JSON.parse(res)
                const { fcmTokens } = auth
                if (fcmTokens && !fcmTokens.includes(token)) {
                    fcmTokens.push(token)
                    await this.Update(auth.id, fcmTokens);
                }

            }
        } catch (error) {
            console.error("❌ Lỗi cập nhật token:", error);
        }
    };

    static Update = async (id: string, fcmTokens: string[]) => {
        try {
            const response = await userAPI.HandleUser('/update-fcmtoken', {
                uid: id,
                fcmTokens
            }, 'post')
            console.log(response)
        } catch (error) {
            console.error("❌ Lỗi cập nhật token:", error);
        }
    }
}
