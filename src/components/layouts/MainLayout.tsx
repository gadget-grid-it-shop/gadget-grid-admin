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

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  const [hydrated, setHydrated] = useState(false);
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      axiosInstance
        .get('/auth/getMyData')
        .then((res) => {
          // console.log(res?.data?.data?.isDeleted);
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
        <div className="flex bg-background-foreground">
          <Sidebar />
          <div className="min-h-screen w-full px-4">
            <Navbar />
            <div className="mt-4 rounded-md bg-background p-5">{children}</div>
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
