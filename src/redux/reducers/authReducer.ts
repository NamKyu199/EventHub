import { createSlice } from "@reduxjs/toolkit";

// Nếu bạn muốn lưu thông tin billDetail trong AuthState, thêm vào đây
export interface AuthState {
    id: string;
    email: string;
    accesstoken: string;
    follow_events: string[];
    fullName?: string;
    photo?: string;
    fcmTokens?: string[];
    following?: string[];
    billDetail?: any; // Thêm trường billDetail
}

const initialState: AuthState = {
    id: '',
    email: '',
    accesstoken: '',
    follow_events: [],
    fullName: '',
    photo: '',
    billDetail: null, // Khởi tạo mặc định là null
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authData: initialState
    },
    reducers: {
        addAuth: (state, action) => {
            state.authData = {
                ...state.authData,
                ...action.payload,
                fullName: action.payload.fullName || state.authData.fullName,
                photo: action.payload.photo || state.authData.photo,
            };
        },
        removeAuth: (state) => {
            state.authData = initialState;
        },
        addFollowedEvent: (state, action) => {
            state.authData.follow_events = action.payload;
        },
        updateFollowing: (state, action) => {
            state.authData.following = action.payload;
        },
        updateBillDetail: (state, action) => { // Thêm reducer để cập nhật billDetail
            state.authData.billDetail = action.payload; // Cập nhật thông tin billDetail
        }
    }
});

export const authReducer = authSlice.reducer;
export const { addAuth, removeAuth, addFollowedEvent, updateFollowing, updateBillDetail } = authSlice.actions;

export const authSelector = (state: any) => state.authReducer.authData;
