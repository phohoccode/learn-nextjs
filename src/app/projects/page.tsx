import Pagination from "@/components/Pagination";
import ProjectList from "@/components/Projects/ProjectList";
import { fectAllProjects, fetchProjectList, item_per_page } from "@/lib/data";
import { Metadata } from "next";
import Link from "next/link";

const metadata: Metadata = {
  title: "Danh sách dự án",
  description: "Danh sách dự án",
};

const Page = async (props: { searchParams?: Promise<{ page?: string }> }) => {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  const data = await fetchProjectList({
    currentPage,
  });

  const countProject = await fectAllProjects();
  const allPage = Math.ceil(countProject.length / item_per_page);

  return (
    <div className="flex flex-col gap-2">
      <Link
        href="/projects/create"
        className="bg-blue-500 p-2 rounded-md text-white text-center"
      >
        Thêm mới dự án
      </Link>
      <ProjectList data={data} />
      <Pagination totalPage={allPage} />
    </div>
  );
};

export default Page;
