import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
    id: string;
    email: string;
    accesstoken: string;
    follow_events: string[];
    fullName?: string;
    photo?: string; // ✅ Thêm trường photo
    fcmTokens?: string[];
}

const initialState: AuthState = {
    id: '',
    email: '',
    accesstoken: '',
    follow_events: [],
    fullName: '',
    photo: '', // ✅ Khởi tạo mặc định
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authData: initialState
    },
    reducers: {
        addAuth: (state, action) => {
            state.authData = {
                ...state.authData, // ✅ Giữ lại dữ liệu cũ
                ...action.payload, // ✅ Ghi đè dữ liệu mới
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
    }
});

export const authReducer = authSlice.reducer;
export const { addAuth, removeAuth, addFollowedEvent } = authSlice.actions;

export const authSelector = (state: any) => state.authReducer.authData;
