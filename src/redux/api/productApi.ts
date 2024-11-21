import { TProduct } from '@/interface/product.interface';
import { baseApi } from './baseApi';

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
    }),
  }),
});

export const { useAddNewProductMutation } = productApi;
