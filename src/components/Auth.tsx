"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Auth = () => {
  const { data: session, status } = useSession();

  // Kiểm tra session có sẵn hay chưa
  const isLoading = status === "loading"; // Đang tải session
  const isLogin = session !== null; // Kiểm tra có session không

  if (isLoading) {
    return <div>Loading...</div>; // Hiển thị loading khi session đang tải
  }

  if (isLogin) {
    return (
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
      >
        Đăng xuất
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      <Link
        href="/auth/login"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Đăng nhập
      </Link>
      <Link
        href="/auth/register"
        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
       Đăng ký
      </Link>
    </div>
  );
};

export default Auth;
