import { TUser } from './auth.interface';
import { TErrorSourse } from './error.interface';
import { TProduct } from './product.interface';

export type TWithError = {
    name: string;
    errorSources: TErrorSourse;
    data: TProduct;
};
export type TSuccessData = {
    name: string;
    slug: string;
    sku: string;
    _id: string;
};

export type TBulkUploadHistory = {
    withError?: TWithError[];
    successData?: TSuccessData[];
    createdBy?: TUser;
    _id?: string;
    createdAt?: string;
    totalUploads?: number;
};
