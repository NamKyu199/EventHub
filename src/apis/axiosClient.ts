import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import queryString from "query-string";
import { appInfo } from "~constants/appInfos";

const getAccessToken = async () => {
    try {
        const res = await AsyncStorage.getItem('auth');
        if (!res) return '';

        const data = JSON.parse(res);
        if (!data?.accesstoken) {
            console.log("Không tìm thấy access token trong AsyncStorage");
            return '';
        }

        console.log("Stored Access Token:", data.accesstoken); // Debug access token
        return data.accesstoken;
    } catch (error) {
        console.error("Lỗi khi lấy token từ AsyncStorage:", error);
        return '';
    }
};

const axiosClient = axios.create({
    baseURL: appInfo.BASE_URL,
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
    const accesstoken = await getAccessToken();

    if (!config.headers) {
        config.headers = {};
    }

    config.headers.Authorization = accesstoken ? `Bearer ${accesstoken}` : '';
    config.headers.Accept = 'application/json';
    config.headers['Content-Type'] = 'application/json';

    console.log("Request Headers:", config.headers); // Debug headers

    return config;
});

axiosClient.interceptors.response.use(
    response => {
        if (response.data && response.status === 200) {
            return response.data;
        }
        throw new Error('Lỗi từ server');
    },
    error => {
        if (error.response) {
            console.error(`API Error: ${error.response.status} - ${error.response.statusText}`);
            console.error("Response Data:", error.response.data);
        } else if (error.request) {
            console.error("Không nhận được phản hồi từ API", error.request);
        } else {
            console.error("Lỗi khi thiết lập request", error.message);
        }
        throw error;
    }
);

export default axiosClient;
