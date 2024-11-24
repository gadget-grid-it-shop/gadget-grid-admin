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
  }),
});

export const { useAddNewProductMutation, useGetAllProductsQuery } = productApi;
