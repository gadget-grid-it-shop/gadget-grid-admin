import { baseApi } from "./baseApi";

const rolesApi = baseApi.injectEndpoints({
    endpoints: (build) => (
        {
            getRoles: build.query({
                query: () => {
                    return {
                        url: '/roles/get-all',
                        method: 'GET'
                    }
                }
            })
        }
    )
})


export const { useGetRolesQuery } = rolesApi