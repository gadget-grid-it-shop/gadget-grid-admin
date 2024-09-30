import { TRole, TUser } from "@/interface/auth.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
    isAuthenticated: boolean,
    role: TRole | null,
    user: TUser | null
}

const initialState: TInitialState = {
    isAuthenticated: false,
    role: null,
    user: null
}



const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        updateAuthData: (state, action: PayloadAction<TInitialState>) => {
            state = action.payload
        }
    }
})

export const { updateAuthData } = authSlice.actions

export default authSlice.reducer