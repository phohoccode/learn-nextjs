"use client";

import { updateProject } from "@/lib/actions";
import { useEffect, useState } from "react";

const EditProject = ({ data }: any) => {
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [projectDemo, setProjectDemo] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setProjectName(data.name);
    setProjectDescription(data.description);
    setProjectDemo(data.demo);
  }, [data]);

  const handleSaveEdit = async () => {
    if (!projectName || !projectDescription || !projectDemo) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setIsLoading(true);
    const res = await updateProject(
      data.id,
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
        onClick={() => handleSaveEdit()}
        className={`bg-blue-500 p-2 rounded-md text-white min-w-[120px] ml-auto ${
          isLoading ? "cursor-not-allowed bg-blue-200" : "cursor-pointer"
        }`}
      >
        {isLoading ? "Đang lưu..." : "Lưu chỉnh sửa"}
      </button>
    </div>
  );
};

export default EditProject;
