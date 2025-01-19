import { TAdminData } from './admin.interface';
import { TUser } from './auth.interface';

export type TNotification = {
    _id: string;
    userTo: TAdminData;
    userFrom: TUser;
    opened: boolean;
    notificationType:
        | 'gallery'
        | 'role'
        | 'product'
        | 'productDetails'
        | 'category'
        | 'photo'
        | 'user'
        | 'brand'
        | 'bulkUpload'
        | 'productFilter';
    text: string;
    source?: string;
};
