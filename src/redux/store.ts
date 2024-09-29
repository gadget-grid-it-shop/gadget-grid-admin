import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApi'
import productReducer from './reducers/products/productSlice'
import authSlice from './reducers/auth/authSlice'

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        products: productReducer,
        auth: authSlice
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch