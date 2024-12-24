"use client";

import { createProject } from "@/lib/actions";
import { useState } from "react";

const CreateProject = () => {
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [projectDemo, setProjectDemo] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateProject = async () => {
    if (!projectName || !projectDescription || !projectDemo) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setIsLoading(true);
    const res = await createProject(
      projectName,
      projectDescription,
      projectDemo
    );
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        id="project-name"
        className="border border-gray-200 rounded-md outline-none p-2 focus:border-blue-500"
        placeholder="Tên dự án..."
      />
      <input
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
        id="project-name"
        className="border border-gray-200 rounded-md outline-none p-2 focus:border-blue-500"
        placeholder="Mô tả dự án..."
      />
      <input
        value={projectDemo}
        onChange={(e) => setProjectDemo(e.target.value)}
        id="project-name"
        className="border border-gray-200 rounded-md outline-none p-2 focus:border-blue-500"
        placeholder="Link demo..."
      />
      <button
        disabled={isLoading}
        onClick={() => handleCreateProject()}
        className={`bg-blue-500 p-2 rounded-md text-white  ${
          isLoading ? "cursor-not-allowed bg-blue-200" : "cursor-pointer"
        }`}
      >
        {isLoading ? "Đang tạo..." : "Tạo dự án"}
      </button>
    </div>
  );
};

export default CreateProject;
