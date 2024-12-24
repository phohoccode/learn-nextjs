"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LinkMap } from "@/lib/type";
import Auth from "./Auth";

const LinkMap: LinkMap[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Dự án", href: "/projects" },
  { label: "Giới thiệu", href: "/about" },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center py-[12px] px-[24px] shadow-md sticky top-0 bg-white z-50">
      <div>
        <h3>PHOHOCCODE</h3>
      </div>
      <ul className="flex space-x-4">
        {LinkMap.map((item, index: number) => (
          <li key={index}>
            <Link
              className={`p-2 rounded-sm hover:bg-blue-500 hover:text-white ${
                pathname == item.href ? "bg-blue-500 text-white" : ""
              }`}
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <Auth />
      </div>
    </div>
  );
};

export default Header;
