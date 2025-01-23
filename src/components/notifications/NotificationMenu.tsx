import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { BsBellFill } from 'react-icons/bs';
import BadgeButtton from '../ui/BadgeButtton';
import { useGetNotificationsQuery } from '@/redux/api/notificationApi';
import UserCard from '../common/UserCard';
import dayjs from '../utilities/Customdayjs';
import { TNotification } from '@/interface/notification.interface';
import { socket } from '@/lib/socket';
import InfiniteScroll from 'react-infinite-scroller';

const NotificationMenu = () => {
    const [page, setPage] = useState(1);
    const { data } = useGetNotificationsQuery(undefined);

    const handleClick = (noti: TNotification) => {
        socket?.emit('notificationClicked', noti._id);
    };

    const loadMoreNotifications = (page: number) => {
        setPage(page);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='outline-none'>
                <BadgeButtton
                    icon={<BsBellFill />}
                    count={data?.data?.unreadCount || 0}
                    tooptip='Notificatons'
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='-right-10 w-80 p-2 bg-background border border-border-color'>
                <DropdownMenuLabel>
                    <p className='font-semibold text-lg pb-1 mb-2 border-b border-border-color'>
                        Notifications
                    </p>
                </DropdownMenuLabel>

                <div className='space-y-2 w-full pb-2 custom-scrollbar max-h-72 overflow-y-auto'>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={loadMoreNotifications}
                        hasMore={true || false}
                        loader={
                            <div className='loader' key={0}>
                                Loading ...
                            </div>
                        }
                        useWindow={false}
                    >
                        {data?.data?.notifications?.map((noti) => (
                            <div
                                onClick={() => handleClick(noti)}
                                key={noti._id}
                                className={`${noti?.opened ? 'bg-background' : 'bg-lavender-mist'} border border-border-color px-3 py-1 rounded-md shadow-md cursor-pointer`}
                            >
                                <p className='font-semibold text-sm line-clamp-2 pb-2'>
                                    {noti?.text}
                                </p>
                                <div className='flex justify-between'>
                                    <UserCard
                                        size='sm'
                                        id={
                                            noti.userFrom._id ||
                                            (noti.userFrom as unknown as string)
                                        }
                                    />
                                    <p className='text-xs text-gray'>
                                        {dayjs(noti?.createdAt)?.fromNow()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </InfiniteScroll>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NotificationMenu;
