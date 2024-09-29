'use server'
import axios from 'axios'


const login = async (email: string, password: string) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/auth/admin-login`, { email, password });
        console.log(res.data)
        if (res.data.success) {
            return res.data
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        return { err: err?.response?.data || 'something went wrong' };
    }
};


export default login