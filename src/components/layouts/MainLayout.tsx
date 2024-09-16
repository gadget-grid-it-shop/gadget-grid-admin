"use client";
import Image from "next/image";
import React, {ReactNode} from "react";
import Navbar from "../shared/Navbar";

import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useTheme} from "next-themes";

const MainLayout = ({children}: {children: ReactNode}) => {
  const {theme} = useTheme();

  return (
    <div className="flex bg-light-gray">
      <div className="h-screen overflow-y-auto bg-primary p-4 w-[320px] shadow-md sticky top-0">
        <Image src={"/gadget-grid-logo.png"} height={100} width={200} alt="logo" />
      </div>
      <div className="min-h-screen w-full">
        <Navbar />
        <div className="px-4">{children}</div>
      </div>
      <ToastContainer theme={theme} />
    </div>
  );
};

export default MainLayout;
