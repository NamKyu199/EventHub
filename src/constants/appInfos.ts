import { Dimensions } from "react-native";

export const appInfo = {
    size: {
        WIDTH: Dimensions.get('window').width,
        HEIGHT: Dimensions.get('window').height,
    },
    BASE_URL: 'http://192.168.1.22:3001',
    // BASE_URL: 'http://localhost:3001',
    // BASE_URL: 'http://172.20.10.3:3001',
    GoogleApiKey: 'AIzaSyCbtwJ3e1wGs0RcFkgQPtaLwg0P4XxkELA',
    monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],
};
