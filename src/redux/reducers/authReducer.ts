import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
    id: string,
    email: string,
    accesstoken: string,
    follow_events: string[]
}

const initialState: AuthState = {
    id: '',
    email: '',
    accesstoken: '',
    follow_events: []
};

const auSlice = createSlice({
    name: 'auth',
    initialState: {
        authData: initialState
    },
    reducers: {
        addAuth: (state, action) => {
            state.authData = action.payload;
        },
        removeAuth: (state) => { // ❌ Không cần action
            state.authData = initialState;
        },
        addFollowedEvent: (state, action) => {
            state.authData.follow_events = action.payload;
        },
    }
});

export const authReducer = auSlice.reducer;
export const { addAuth, removeAuth, addFollowedEvent } = auSlice.actions;

export const authSelector = (state: any) => state.authReducer.authData;
