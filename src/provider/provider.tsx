"use client";
import { store } from "@/redux/store";
import { ThemeProvider } from "next-themes";
import React from "react";
import { Provider } from "react-redux";

const GlobalProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {


  return (
    <ThemeProvider attribute="class">
      <Provider store={store}>
        {children}
      </Provider>
    </ThemeProvider>
  );
};

export default GlobalProvider;
