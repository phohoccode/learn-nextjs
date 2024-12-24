import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dự án",
  description: "Danh sách dự án của tôi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
