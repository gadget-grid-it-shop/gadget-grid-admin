import axios from "axios";
import { getAccessToken } from "./utils";

const isClient = typeof window !== 'undefined';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL,
    timeout: 20000,
    headers: {
        Accept: 'application/json'
    },
    withCredentials: true
})


axiosInstance.interceptors.request.use((config) => {
    if (isClient) {
        const token = getAccessToken()
        if (token) {
            config.headers['Authorization'] = `${token}`
        }
    }
    return config
})

export default axiosInstance