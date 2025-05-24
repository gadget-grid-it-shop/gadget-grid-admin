'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from 'next-themes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance';
import { setUserData } from '@/redux/reducers/auth/authSlice';
import { globalError, handleLogout } from '@/lib/utils';
import { connectSocket, disconnectSocket, socket } from '@/lib/socket';
import { SidebarProvider, useSidebar } from '../ui/sidebar';
import { AppSidebar } from '../shared/AppSidebar';

const MainLayout = ({ children }: { children: ReactNode }) => {
    const { theme } = useTheme();
    const [hydrated, setHydrated] = useState(false);
    const { isAuthenticated } = useAppSelector((s) => s.auth);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { user } = useAppSelector((s) => s.auth);

    useEffect(() => {
        setHydrated(true);
    }, []);

    useEffect(() => {
        const initilaAction = async () => {
            await connectSocket();
            socket?.emit('adminJoin', { user: user?.user?._id });
        };

        initilaAction();

        return () => {
            disconnectSocket();
        };
    }, [user]);

    // useEffect(() => {
    //     socket?.on('newNotification', (payload) => {
    //         const audio = new Audio('/notification_2.wav');
    //         audio.play().catch((err) => console.log(err));
    //         toast(payload.text || 'new notification', {
    //             position: 'bottom-right',
    //         });

    //         dispatch(
    //             notificationApi.util.updateQueryData(
    //                 'getNotifications',
    //                 undefined,
    //                 (draft) => {
    //                     draft.data.notifications.unshift(payload);
    //                     draft.data.unreadCount = draft.data.unreadCount + 1;
    //                 },
    //             ),
    //         );
    //     });
    // });

    useEffect(() => {
        if (isAuthenticated) {
            axiosInstance
                .get('/auth/getMyData')
                .then((res) => {
                    if (res?.data?.data?.isDeleted === true) {
                        handleLogout();
                    }
                    dispatch(
                        setUserData({
                            user: res?.data?.data,
                            permissions: res.data?.data?.role?.permissions,
                        }),
                    );
                })
                .catch((err) => {
                    globalError(err);
                });
        } else {
            router.push('/login');
        }
    }, [isAuthenticated, router, dispatch]);

    const { state } = useSidebar();

    return (
        <>
            {hydrated ? (
                <div className='flex bg-background-foreground w-full'>
                    <AppSidebar />
                    <main
                        className={`relative bg-background ${state === 'expanded' ? 'md:w-[calc(100%-256px)]' : 'md:w-[calc(100%-48px)]'} w-full`}
                    >
                        <Navbar />
                        <div className='w-full rounded-md bg-background p-3'>
                            {children}
                        </div>
                    </main>
                    <ToastContainer theme={theme} />
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default MainLayout;
