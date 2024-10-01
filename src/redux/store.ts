import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApi'
import productReducer from './reducers/products/productSlice'
import authSlice from './reducers/auth/authSlice'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import generalSlice from './reducers/general/generalReducer'

const persistConfig = {
    key: 'auth',
    storage
}

const persistedAuthReducer = persistReducer(persistConfig, authSlice)

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        products: productReducer,
        auth: persistedAuthReducer,
        general: generalSlice
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


export const persistor = persistStore(store)