import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    id: string,
    email: string,
    accesstoken: string,
}

const initialState: AuthState = {
    id: '',
    email: '',
    accesstoken: ''
};

const auSlice = createSlice({
    name: 'auth',
    initialState: {
        authData: initialState
    },
    reducers: {
        addAuth: (state, action) => {
            state.authData = action.payload
        }
    }
})

export const authReducer = auSlice.reducer
export const { addAuth } = auSlice.actions

export const authSelector = (state: any) => state.authReducer.authData;