import { baseApi } from "./baseApi";
import { tagTypes } from "./tagTypes";

const uploadFileApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        getAllImages: build.query({
            query: () => {
                return {
                    url: '/upload/get-all',
                    method: 'GET'
                }
            },
            providesTags: [tagTypes.upload]
        }),

        uploadImage: build.mutation({
            query: (formData: FormData) => {
                return {
                    url: '/upload/upload-image',
                    method: 'POST',
                    body: formData
                }
            },
            invalidatesTags: [tagTypes.upload]
        })
    })
})


export const { useUploadImageMutation, useGetAllImagesQuery } = uploadFileApi