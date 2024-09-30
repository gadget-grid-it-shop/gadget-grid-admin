import { store } from "@/redux/store";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL,
    timeout: 8000,
    headers: {
        Accept: 'application/json'
    },
    withCredentials: true
})


axiosInstance.interceptors.request.use((config) => {
    const { token } = store.getState().auth
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
})

export default axiosInstance