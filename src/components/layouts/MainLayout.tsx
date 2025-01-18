'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from 'next-themes';
import Sidebar from '../shared/Sidebar';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance';
import { setUserData } from '@/redux/reducers/auth/authSlice';
import { globalError, handleLogout } from '@/lib/utils';
import { io } from 'socket.io-client';
import { toast } from 'sonner';

const MainLayout = ({ children }: { children: ReactNode }) => {
    const { theme } = useTheme();
    const [hydrated, setHydrated] = useState(false);
    const { isAuthenticated } = useAppSelector((s) => s.auth);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        setHydrated(true);
        const socket = io('http://localhost:5000');
        socket.emit('adminJoin', { adminJoinId: process.env.admin_join_id });

        socket.on('newNotification', (payload) => {
            toast('new notification', {
                position: 'bottom-right',
            });
        });
    }, []);

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

    return (
        <>
            {hydrated ? (
                <div className='flex overflow-hidden bg-background-foreground'>
                    <div>
                        <Sidebar />
                    </div>
                    <div
                        className={`main-layout h-screen w-screen overflow-y-auto px-4 min-[1200px]:w-[calc(100vw-260px)] 2xl:w-[calc(100vw-280px)]`}
                    >
                        <Navbar />
                        <div className='mt-4 rounded-md bg-background p-5'>
                            {children}
                        </div>
                    </div>
                    <ToastContainer theme={theme} />
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default MainLayout;
