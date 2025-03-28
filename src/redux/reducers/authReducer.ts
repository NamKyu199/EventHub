import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
    id: string;
    email: string;
    accesstoken: string;
    follow_events: string[];
    fullName?: string; // ✅ Thêm fullName vào interface
    fcmTokens?: string[];
}

const initialState: AuthState = {
    id: '',
    email: '',
    accesstoken: '',
    follow_events: [],
    fullName: '', // ✅ Khởi tạo mặc định
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authData: initialState
    },
    reducers: {
        addAuth: (state, action) => {
            state.authData = {
                ...action.payload,
                fullName: action.payload.fullName || '', // ✅ Đảm bảo luôn có fullName
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
