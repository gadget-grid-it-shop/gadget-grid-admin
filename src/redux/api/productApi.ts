import { TProduct } from '@/interface/product.interface';
import { baseApi } from './baseApi';
import { tagTypes } from './tagTypes';

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

    getAllProducts: build.query({
      query: () => {
        return {
          url: '/product/get-all',
          method: 'GET',
        };
      },
      providesTags: [tagTypes.product],
    }),

    getSingleProduct: build.query({
      query: (id: string) => ({
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
      query: ({ id, payload }: { id: string; payload: Partial<TProduct> }) => {
        return {
          url: `/product/update-product/${id}`,
          method: 'PATCH',
          data: payload,
        };
      },
      invalidatesTags: [tagTypes.upload],
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
