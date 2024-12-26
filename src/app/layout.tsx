import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Trang chủ của PHO-BLOG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (

    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader showSpinner={false} />
        <SessionProvider>
          <Header />
          <div className="p-[24px]">{children}</div>
        </SessionProvider>

        <ToastContainer />
      </body>
    </html>
  );
}
