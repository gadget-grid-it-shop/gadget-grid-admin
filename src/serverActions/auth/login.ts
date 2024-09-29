'use server'
import { TUser } from '@/interface/auth.interface';
import axios from 'axios'

// Define a type-safe response structure for your API
interface LoginResponse {
    token: string;
    user: TUser;
}

interface ErrorResponse {
    err: string;
}

const login = async (email: string, password: string): Promise<LoginResponse | ErrorResponse> => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/auth/admin-login`, { email, password });
        return res.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        return { err: err?.response?.data || 'something went wrong' };
    }
};


export default login