import { TResponse } from '@/interface/common.interface';
import { baseApi } from './baseApi';
import { TNotification } from '@/interface/notification.interface';

const notificationApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<
            TResponse<{
                notifications: TNotification[];
                unreadCount: number;
            }>,
            undefined
        >({
            query: () => ({
                url: '/notification/my-notifications',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetNotificationsQuery } = notificationApi;
