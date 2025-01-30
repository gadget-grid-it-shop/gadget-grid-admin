import { TCreateCategory, TUpdateCategory } from '@/interface/category';
import { baseApi } from './baseApi';
import { tagTypes } from './tagTypes';
import { socket } from '@/lib/socket';

const categoriesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllCategories: build.query({
            query: (isTree: boolean = true) => {
                return {
                    url: `/category/get-all${!isTree ? '?isTree=false' : ''}`,
                    method: 'GET',
                };
            },

            async onCacheEntryAdded(
                arg,
                { cacheDataLoaded, cacheEntryRemoved, updateCachedData },
            ) {
                try {
                    await cacheDataLoaded;

                    socket?.on('category', (data) => {
                        console.log(data);
                    });
                } catch (err) {
                    console.log(err);
                }
            },

            keepUnusedDataFor: 320,
            providesTags: [tagTypes.categories],
        }),

        createCategory: build.mutation({
            query: (payload: TCreateCategory) => {
                return {
                    url: '/category/create',
                    method: 'POST',
                    data: payload,
                };
            },

            invalidatesTags: [tagTypes.categories],
        }),

        deleteCategory: build.mutation({
            query: (id: string) => {
                return {
                    url: `/category/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: [tagTypes.categories],
        }),

        updateCategory: build.mutation({
            query: ({
                id,
                payload,
            }: {
                id: string;
                payload: TUpdateCategory;
            }) => {
                return {
                    url: `/category/${id}`,
                    method: 'PATCH',
                    data: payload,
                };
            },
            invalidatesTags: [tagTypes.categories],
        }),
    }),
});

export const {
    useGetAllCategoriesQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
} = categoriesApi;
