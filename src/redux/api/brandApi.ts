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
  }),
});

export const { useGetAllBrandsQuery } = brandApi;
