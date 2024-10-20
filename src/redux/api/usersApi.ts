import { baseApi } from './baseApi';
import { tagTypes } from './tagTypes';

export type TCreateAdmin = {
  email: string;
  password: string;
  role: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
};

const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAdmins: build.query({
      query: () => {
        return {
          url: '/user/admin/get-all',
          method: 'GET',
        };
      },
      providesTags: [tagTypes.admins],
    }),

    createAdmin: build.mutation({
      query: (payload: TCreateAdmin) => {
        return {
          url: '/user/create-admin',
          method: 'POST',
          data: payload,
        };
      },
      invalidatesTags: [tagTypes.admins],
    }),

    deleteUser: build.mutation({
      query: ({ id, role }: { id: string; role: 'admin' | 'customer' }) => {
        return {
          url: `/user/${id}`,
          method: 'DELETE',
          data: { role },
        };
      },
      invalidatesTags: [tagTypes.admins],
    }),
  }),
});

export const {
  useGetAllAdminsQuery,
  useCreateAdminMutation,
  useDeleteUserMutation,
} = usersApi;
