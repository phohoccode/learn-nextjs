"use client";

import { deleteProject } from "@/lib/actions";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ButtonDelete = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeleteProject = async () => {
    setIsLoading(true);
    const res = await deleteProject(id);
    console.log(">>> res", res);

    setIsLoading(false);

    if (res?.status === "success") {
      toast.success(res?.message);
      redirect("/projects");
    } else {
      toast.error(res?.message);
    }
  };

  return (
    <button
      disabled={isLoading}
      onClick={() => handleDeleteProject()}
      className={`focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ${
        isLoading ? "cursor-not-allowed opacity-70" : ""
      }`}
    >
      {isLoading ? "Đang xóa..." : "Xóa"}
    </button>
  );
};

export default ButtonDelete;
