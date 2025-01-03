"use client";

import { createUser, registerUser } from "@/lib/actions";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const initState = { status: "idle", message: "" };
  const [state, formAction, pending] = useActionState(createUser, initState);


  // không sử dụng try catch từ server
  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      // redirect("/auth/login");
      router.push("/auth/login");
    }

    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  // sử dụng try catch từ server
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return toast.error("Vui lòng nhập email và mật khẩu");
    }

    setIsLoading(true);
    const res = await registerUser(email, password);



    if (res?.status === "error") {
      toast.error(res?.message);
    } else {
      toast(res?.message);
      redirect("/auth/login");
    }

    setIsLoading(false);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Đăng ký tài khoản
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              // onSubmit={handleSubmit}
              action={formAction}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Tên người dùng
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-full focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="phohoccode"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-full focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-full focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-500 dark:text-gray-300">
                      Ghi nhớ đăng nhập
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Quên mật khẩu?
                </a>
              </div>
              <button
                disabled={isLoading}
                type="submit"
                className={`w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${
                  pending ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {pending ? "Đang đăng ký..." : "Đăng ký"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Đã có tài khản?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                >
                  Đăng nhập
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
