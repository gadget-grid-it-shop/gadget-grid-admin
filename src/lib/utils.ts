import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jwtDecode } from 'jwt-decode';
import { TGenericErrorResponse } from '@/interface/error.interface';
import { toast } from 'sonner';
import { store } from '@/redux/store';
import { resetAuthData } from '@/redux/reducers/auth/authSlice';
import { clearCookie } from '@/actions/logout';
import { TProduct } from '@/interface/product.interface';
import {
    updateEditProduct,
    updateProduct,
} from '@/redux/reducers/products/productSlice';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const verifyToken = (token: string) => {
    const decoded = jwtDecode(token);
    return decoded;
};

export const globalError = (error: unknown) => {
    const typeError = error as { data: TGenericErrorResponse };

    if (typeError?.data?.errorSources?.length > 0) {
        toast.error(typeError.data?.errorSources[0]?.message);
    } else {
        toast.error('An unknown error occurred');
    }
};

export const getAccessToken = () => {
    const { token } = store.getState().auth;
    if (token) {
        return token;
    } else {
        return null;
    }
};

export const handleLogout = () => {
    store.dispatch(resetAuthData());
    clearCookie();
};

export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
        return false;
    }
}

export const handleProductChange = <K extends keyof TProduct>(
    key: K,
    value: TProduct[K],
    edit?: boolean,
) => {
    if (edit) {
        store.dispatch(updateEditProduct({ key, value }));
    } else {
        store.dispatch(updateProduct({ key, value }));
    }
};
