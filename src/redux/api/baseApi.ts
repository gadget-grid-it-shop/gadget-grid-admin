import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { tagTypesList } from './tagTypes'

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_URL }),
    tagTypes: tagTypesList,
    endpoints: () => ({})
})