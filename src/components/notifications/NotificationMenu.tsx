import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { BsBellFill } from 'react-icons/bs';
import BadgeButtton from '../ui/BadgeButtton';
import { useGetNotificationsQuery } from '@/redux/api/notificationApi';

const NotificationMenu = () => {
    const { data } = useGetNotificationsQuery(undefined);

    console.log(data?.data);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='outline-none'>
                <BadgeButtton
                    icon={<BsBellFill />}
                    count={999}
                    tooptip='Notificatons'
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='-right-10 w-72 p-2 bg-background border border-border-color'>
                <DropdownMenuLabel>
                    <p className='font-semibold text-lg pb-1 mb-2 border-b border-border-color'>
                        Notifications
                    </p>
                </DropdownMenuLabel>

                <div className='space-y-2 w-full pb-2 custom-scrollbar max-h-72 overflow-y-auto'>
                    {data?.data?.map((noti) => (
                        <div
                            key={noti._id}
                            className='bg-lavender-mist px-3 py-1 rounded-md shadow-md'
                        >
                            <p>{noti?.text}</p>
                        </div>
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NotificationMenu;
