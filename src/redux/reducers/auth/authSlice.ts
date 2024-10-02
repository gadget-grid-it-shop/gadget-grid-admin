import { TPermission, TRole, TUser } from "@/interface/auth.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
    isAuthenticated: boolean,
    role: TRole | null,
    user: TUser | null,
    permissions: TPermission[],
    isVerified: boolean,
    token: string | null
}

const initialState: TInitialState = {
    isAuthenticated: false,
    role: null,
    user: null,
    permissions: [],
    isVerified: false,
    token: null
}



const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        updateAuthData: (state, action: PayloadAction<TInitialState>) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.role = action.payload.role;
            state.user = action.payload.user;
            state.permissions = action.payload.permissions;
            state.isVerified = action.payload.isVerified;
            state.token = action.payload.token;
        },
        resetAuthData: () => initialState
    }
})

export const { updateAuthData, resetAuthData } = authSlice.actions

export default authSlice.reducer