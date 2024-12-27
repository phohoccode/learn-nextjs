"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

const Account = () => {
  const { data: session } = useSession();
  const id = session?.user?.id;
  const username = session?.user?.name;
  const email = session?.user?.email;
  const image = session?.user?.image;

  console.log(">>> session", session);

  return (
    <>
      {session?.user && (
        <div className="flex gap-5">
          <div className="relative">
            <Image
              className="rounded-full"
              src={image as string}
              alt="avartar"
              width={90}
              height={90}
            />
            <span className="top-2 right-1 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            <h1 className="text-blue-600">
              Tên người dùng: <span className="text-black">{username}</span>
            </h1>
            <h1 className="text-blue-600">
              Email: <span className="text-black">{email}</span>
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
