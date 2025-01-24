import { TResponse } from '@/interface/common.interface';
import { baseApi } from './baseApi';
import { TNotification } from '@/interface/notification.interface';
import { socket } from '@/lib/socket';
import { toast } from 'sonner';

const notificationApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<
            TResponse<{
                notifications: TNotification[];
                unreadCount: number;
            }>,
            {
                page: number;
                limit: number;
            }
        >({
            query: (params) => ({
                url: '/notification/my-notifications',
                method: 'GET',
                params: params || {},
            }),
        }),
    }),
});

export const { useGetNotificationsQuery } = notificationApi;

export default notificationApi;
