"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Navbar from "../shared/Navbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "next-themes";
import Sidebar from "../shared/Sidebar";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  const [hydrated, setHydrated] = useState(false)
  const { isAuthenticated } = useAppSelector(s => s.auth)
  const router = useRouter()

  useEffect(() => {
    setHydrated(true)
  }, [])

  console.log(isAuthenticated)

  if (!isAuthenticated) {
    router.push('/login')
  }

  useEffect(() => {
    if (isAuthenticated) {
      axiosInstance.get('/auth/getMyData')
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [isAuthenticated])


  return (
    <>
      {
        hydrated ? <div className="flex bg-background-foreground">
          < Sidebar />
          <div className="min-h-screen w-full px-4">
            <Navbar />
            <div className="mt-4 bg-background rounded-md p-5">{children}</div>
          </div>
          <ToastContainer theme={theme} />
        </div > : <></>
      }
    </>
  );
};

export default MainLayout;
