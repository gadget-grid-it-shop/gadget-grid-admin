import { TNotification } from '@/interface/notification.interface';
import { baseApi } from '@/redux/api/baseApi';
import { tagTypes } from '@/redux/api/tagTypes';
import { store } from '@/redux/store';

const findTag = (tag: TNotification['notificationType']) => {
    switch (tag) {
        case 'brand':
            return tagTypes.brands;
        case 'bulkUpload':
            return tagTypes.bulkUpload;
        case 'category':
            return tagTypes.categories;
        case 'gallery':
            return tagTypes.galleryFolder;
        case 'photo':
            return tagTypes.upload;
        case 'product':
            return tagTypes.product;
        case 'productDetails':
            return tagTypes.detailsCategory;
        case 'productFilter':
            return tagTypes.productFilter;
        case 'role':
            return tagTypes.roles;
        default:
            return undefined;
    }
};

export const handleNewNotification = (noti: TNotification) => {
    const { user } = store.getState().auth;
    const tag = findTag(noti.notificationType);
    if (tag && noti.userFrom?.user?._id !== user?.user?._id) {
        baseApi.util.invalidateTags([tag]);
    }
};
