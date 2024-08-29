import { Poppins } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import AntConfigProvider from "@/providers/AntConfigProvider";
import MainLayout from "@/components/layouts/MainLayout";

const poppins = Poppins({
  subsets: ["latin"],
  // weight: [`100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`]
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Gadget Grid",
  description: "Admin pannel gadget grid",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
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
