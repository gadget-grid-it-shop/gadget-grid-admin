import { TCreateCategory, TUpdateCategory } from "@/interface/category";
import { baseApi } from "./baseApi";
import { tagTypes } from "./tagTypes";

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCategories: build.query({
      query: () => {
        return {
          url: `${process.env.NEXT_PUBLIC_URL}/category/get-all`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.categories],
    }),

    createCategory: build.mutation({
      query: (payload: TCreateCategory) => {
        return {
          url: "/category/create",
          method: "POST",
          body: payload,
        };
      },

      invalidatesTags: [tagTypes.categories],
    }),

    deleteCategory: build.mutation({
      query: (id: string) => {
        return {
          url: `/category/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: [tagTypes.categories]
    }),


    updateCategory: build.mutation({
      query: ({ id, payload }: { id: string, payload: TUpdateCategory }) => {
        return {
          url: `/category/${id}`,
          method: 'PATCH',
          body: payload
        }
      },
      invalidatesTags: [tagTypes.categories]
    })
  }),
});

export const { useGetAllCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } = categoriesApi;
