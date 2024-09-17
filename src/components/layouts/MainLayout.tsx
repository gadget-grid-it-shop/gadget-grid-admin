"use client";

import React, { ReactNode } from "react";
import Navbar from "../shared/Navbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "next-themes";
import Sidebar from "../shared/Sidebar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();

  return (
    <div className="flex bg-light-gray">
      <Sidebar />
      <div className="min-h-screen w-full">
        <Navbar />
        <div className="px-4">{children}</div>
      </div>
      <ToastContainer theme={theme} />
    </div>
  );
};

export default MainLayout;
