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
            undefined
        >({
            query: () => ({
                url: '/notification/my-notifications',
                method: 'GET',
            }),
            async onCacheEntryAdded(
                arr,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
            ) {
                try {
                    await cacheDataLoaded;
                    const handleNewNotification = (payload: TNotification) => {
                        const audio = new Audio('/notification_2.wav');
                        audio.play().catch((err) => console.log(err));
                        toast(payload.text || 'new notification', {
                            position: 'bottom-right',
                        });
                        updateCachedData((draft) => {
                            draft.data.notifications.unshift(payload);
                            draft.data.unreadCount += 1;
                        });
                    };

                    const handleRead = (data: TNotification) => {
                        updateCachedData((draft) => {
                            const markedNoti = draft.data?.notifications?.find(
                                (noti) => noti._id === data._id,
                            );
                            if (markedNoti) {
                                markedNoti.opened = true;
                                draft.data.unreadCount =
                                    draft.data.unreadCount - 1;
                            }
                        });
                    };

                    socket?.on('newNotification', handleNewNotification);
                    socket?.on('notificationRead', handleRead);

                    // clear listeners
                    await cacheEntryRemoved;
                    socket?.off('newNotification', handleNewNotification);
                    socket?.off('notificationRead', handleRead);
                } catch (err) {
                    console.log(err);
                }
            },
        }),
    }),
});

export const { useGetNotificationsQuery } = notificationApi;

export default notificationApi;
