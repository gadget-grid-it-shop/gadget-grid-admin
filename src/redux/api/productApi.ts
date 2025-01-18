import { TProduct } from '@/interface/product.interface';
import { baseApi } from './baseApi';
import { tagTypes } from './tagTypes';
import { TResponse } from '@/interface/common.interface';

const productApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addNewProduct: build.mutation({
            query: (product: TProduct) => {
                return {
                    url: '/product/create-product',
                    method: 'POST',
                    data: product,
                };
            },
            invalidatesTags: [tagTypes.product],
        }),

        getAllProducts: build.query<
            TResponse<TProduct[]>,
            Record<string, string | number> | undefined
        >({
            query: (params) => {
                return {
                    url: '/product/get-all',
                    method: 'GET',
                    params: params || {},
                };
            },
            providesTags: [tagTypes.product],
            keepUnusedDataFor: 180,
        }),

        getSingleProduct: build.query<TResponse<TProduct>, string>({
            query: (id) => ({
                url: `/product/single/${id}`,
                method: 'GET',
            }),
        }),

        bulkUpload: build.mutation({
            query: (formData: FormData) => {
                return {
                    url: '/product/bulk-upload',
                    method: 'POST',
                    data: formData,
                };
            },
            invalidatesTags: [tagTypes.upload],
        }),

        updateProduct: build.mutation({
            query: ({
                id,
                payload,
            }: {
                id: string;
                payload: Partial<TProduct>;
            }) => {
                return {
                    url: `/product/update-product/${id}`,
                    method: 'PATCH',
                    data: payload,
                };
            },
            invalidatesTags: [tagTypes.product],
        }),
    }),
});

export const {
    useAddNewProductMutation,
    useGetAllProductsQuery,
    useBulkUploadMutation,
    useGetSingleProductQuery,
    useUpdateProductMutation,
} = productApi;
