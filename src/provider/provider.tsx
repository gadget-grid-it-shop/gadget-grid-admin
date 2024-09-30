"use client";
import { persistor, store } from "@/redux/store";
import { ThemeProvider } from "next-themes";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const GlobalProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {


  return (
    <ThemeProvider attribute="class">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default GlobalProvider;
