import { baseApi } from './baseApi';
import { tagTypes } from './tagTypes';

export type TCreateProductFilter = {
    _id?: string;
    title: string;
    options: string[];
};

const filtersApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllProductFilters: build.query({
            query: () => ({
                url: '/product-filters/get-all',
                method: 'GET',
            }),
            providesTags: [tagTypes.productFilter],
        }),

        createProductFilter: build.mutation({
            query: (payload: TCreateProductFilter) => ({
                url: '/product-filters/create',
                method: 'POST',
                data: payload,
            }),
            invalidatesTags: [tagTypes.productFilter],
        }),

        updateProductFilter: build.mutation({
            query: ({
                payload,
                id,
            }: {
                payload: TCreateProductFilter;
                id: string;
            }) => ({
                url: `/product-filters/update/${id}`,
                method: 'PATCH',
                data: payload,
            }),
            invalidatesTags: [tagTypes.productFilter],
        }),
    }),
});

export const {
    useCreateProductFilterMutation,
    useUpdateProductFilterMutation,
    useGetAllProductFiltersQuery,
} = filtersApi;
