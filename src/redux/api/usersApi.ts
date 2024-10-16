import { baseApi } from "./baseApi";
import { tagTypes } from "./tagTypes";

const usersApi = baseApi.injectEndpoints({
    endpoints: (build) => (
        {
            getAllAdmins: build.query({
                query: () => {
                    return {
                        url: '/user/admin/get-all',
                        method: 'GET'
                    }
                },
                providesTags: [tagTypes.admins]
            })
        }
    )
})


export const { useGetAllAdminsQuery } = usersApi