import { TBrand } from '@/interface/brand.interface';
import { baseApi } from './baseApi';
import { tagTypes } from './tagTypes';

const brandApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBrands: build.query({
      query: () => {
        return {
          url: '/brand/get-all',
          method: 'GET',
        };
      },
      providesTags: [tagTypes.brands],
    }),

    createBrand: build.mutation({
      query: (payload: Pick<TBrand, 'name' | 'image'>) => {
        return {
          url: '/brand/create',
          method: 'POST',
          data: payload,
        };
      },
      invalidatesTags: [tagTypes.brands],
    }),
  }),
});

export const { useGetAllBrandsQuery, useCreateBrandMutation } = brandApi;
