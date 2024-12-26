"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LinkMap } from "@/lib/type";
import Auth from "./Auth";
import { useSession } from "next-auth/react";

const LinkMap: LinkMap[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Dự án", href: "/projects" },
  { label: "Giới thiệu", href: "/about" },
];

const protectedLink = ["/projects"];

const Header = () => {
  const pathname = usePathname();
  const { data: session } = useSession(); // Sửa từ sesstion thành session

  if (pathname === "/auth/login" || pathname === "/auth/register") {
    return null; // Không hiển thị header khi ở trang login hoặc register
  }

  return (
    <div className="flex justify-between items-center py-[12px] px-[24px] shadow-md sticky top-0 bg-white z-50">
      <div>
        <h3>PHOHOCCODE</h3>
      </div>
      <ul className="flex space-x-4">
        {LinkMap.map((item, index: number) => {
          if (protectedLink.includes(item.href) && !session) return null;

          return (
            <li key={index}>
              <Link
                className={`${
                  pathname === item.href
                    ? "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    : "py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                }`}
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div>
        <Auth />
      </div>
    </div>
  );
};

export default Header;
