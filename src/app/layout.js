import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import AntConfigProvider from "@/providers/AntConfigProvider";
import MainLayout from "@/layouts/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gadget Grid",
  description: "Admin pannel gadget grid",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <AntConfigProvider>
            <MainLayout>
              {children}
            </MainLayout>
          </AntConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
