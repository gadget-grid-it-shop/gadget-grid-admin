
import { store } from '@/redux/store'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'

export const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: '' }
    ): BaseQueryFn<
        {
            url: string
            method?: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
            headers?: AxiosRequestConfig['headers']
        },
        unknown,
        unknown
    > =>
        async ({ url, method, data, params, headers }) => {
            try {

                const { token } = store.getState().auth

                console.log(token)

                const result = await axios({
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                    headers: {
                        ...headers,
                        Authorization: `${token}`
                    },
                })
                return { data: result.data }
            } catch (axiosError) {
                const err = axiosError as AxiosError
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                }
            }
        }
