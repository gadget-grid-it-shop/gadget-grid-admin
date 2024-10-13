import {TRole} from "@/interface/auth.interface";
import {baseApi} from "./baseApi";
import {tagTypes} from "./tagTypes";

const rolesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRoles: build.query({
      query: () => {
        return {
          url: "/roles/get-all",
          method: "GET",
        };
      },
      providesTags: [tagTypes.roles],
    }),

    updateRole: build.mutation({
      query: ({id, payload}: {id: string; payload: Partial<TRole>}) => {
        return {
          url: `/roles/update-role/${id}`,
          method: "PATCH",
          data: payload,
        };
      },
      invalidatesTags: [tagTypes.roles],
    }),
  }),
});

export const {useGetRolesQuery, useUpdateRoleMutation} = rolesApi;
