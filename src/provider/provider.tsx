
'use client'
import MainLayout from '@/components/layouts/MainLayout'
import { store } from '@/redux/store'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ThemeProvider } from 'next-themes'
import React from 'react'
import { Provider } from 'react-redux'

const GlobalProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <ThemeProvider attribute="class" >
            <Provider store={store}>
                <MainLayout>
                    <AntdRegistry>
                        {children}
                    </AntdRegistry>
                </MainLayout>
            </Provider>
        </ThemeProvider>
    )
}

export default GlobalProvider