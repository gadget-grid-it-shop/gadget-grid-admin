import { TRole, TUser } from "@/interface/auth.interface";
import { createSlice } from "@reduxjs/toolkit";

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

    }
})

export default authSlice.reducer