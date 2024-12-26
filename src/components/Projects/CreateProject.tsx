"use client";

import { createProject } from "@/lib/actions";
import { response } from "@/lib/type";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateProject = () => {
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [projectDemo, setProjectDemo] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateProject = async () => {
    if (!projectName || !projectDescription || !projectDemo) {
      toast.error("Vui lòng điền đầy đủ thông tin!!!");
      return;
    }

    setIsLoading(true);
    const res: response = await createProject(
      projectName,
      projectDescription,
      projectDemo
    );

    setIsLoading(false);

    if (res?.status === "success") {
      toast.success(res?.message);
      redirect("/projects");
    } else {
      toast.error(res?.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="mb-5">
        <label
          htmlFor="project-name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Tên dự án
        </label>
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          id="project-name"
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="project-description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Mô tả dự án
        </label>
        <input
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          id="project-description"
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="project-demo"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Liên kết dự án
        </label>
        <input
          value={projectDemo}
          onChange={(e) => setProjectDemo(e.target.value)}
          id="project-demo"
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <button
        disabled={isLoading}
        onClick={() => handleCreateProject()}
        className={`w-full mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  ${
          isLoading ? "cursor-not-allowed opacity-70" : ""
        }`}
      >
        {isLoading ? "Đang tạo..." : "Tạo dự án"}
      </button>
    </div>
  );
};

export default CreateProject;
