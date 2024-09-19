import { TProductCategory } from "@/interface/category";
import { baseApi } from "./baseApi";
import { tagTypes } from "./tagTypes";

const detailsCategoryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getDetailsCategories: build.query({
            query: () => {
                return {
                    url: '/product-details-category/get-all',
                    method: 'GET',
                }
            },
            providesTags: [tagTypes.detailsCategory]
        }),
        createDetailsCategory: build.mutation({
            query: (payload: TProductCategory) => {
                return {
                    url: '/product-details-category/create',
                    method: 'POST',
                    body: payload,
                }
            },
            invalidatesTags: [tagTypes.detailsCategory]
        }),

        deleteDetailsCategory: build.mutation({
            query: ({ payload, id }) => {
                return {
                    url: ``
                }
            }
        })
    })
})


export const { useGetDetailsCategoriesQuery, useCreateDetailsCategoryMutation } = detailsCategoryApi