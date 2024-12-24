"use client";

import { deleteProject } from "@/lib/actions";
import { useState } from "react";

const ButtonDelete = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeleteProject = async () => {
    setIsLoading(true);
    const res = await deleteProject(id);
    setIsLoading(false);
  };

  return (
    <button
      disabled={isLoading}
      onClick={() => handleDeleteProject()}
      className={`bg-red-600 p-2 rounded-md text-white ${
        isLoading ? "cursor-not-allowed bg-red-200" : "cursor-pointer"
      }`}
    >
      {isLoading ? "Đang xóa..." : "Xóa"}
    </button>
  );
};

export default ButtonDelete;
