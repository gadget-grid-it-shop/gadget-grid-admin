'use client';
import useGetAdminData from '@/hooks/useGetAdminData';
import { TAdminData } from '@/interface/admin.interface';
import { isValidUrl } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { FaUser } from 'react-icons/fa6';

const UserCard = ({ id }: { id: string }) => {
    const findUser = useGetAdminData();
    const user: TAdminData = findUser(id);
    console.log(user);
    return (
        <div className='flex gap-2 items-center'>
            <Avatar>
                <AvatarImage
                    className='size-10 object-cover'
                    src={user?.profilePicture}
                />
                <AvatarFallback className='capitalize'>
                    <div className='flex size-10 items-center justify-center rounded-full bg-background'>
                        <FaUser />
                    </div>
                </AvatarFallback>
            </Avatar>
            <div>
                <h2 className='font-semibold capitalize text-gray'>
                    {user?.fullName || 'N/A'}
                </h2>
                <h2 className='text-gray'>{user?.role?.role || 'N/A'}</h2>
            </div>
        </div>
    );
};

export default UserCard;
