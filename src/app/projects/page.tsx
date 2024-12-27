import Pagination from "@/components/Pagination";
import ProjectList from "@/components/Projects/ProjectList";
import { fectAllProjects, fetchProjectList, item_per_page } from "@/lib/data";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";

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
      <div className="flex gap-10 items-center justify-between flex-wrap">
        <Link
          href="/projects/create"
          className="text-white mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center"
        >
          Thêm mới dự án
        </Link>
      </div>

      <Suspense fallback={<Loading />}>
        <ProjectList data={data} />
      </Suspense>

      <Pagination totalPage={allPage} />
    </div>
  );
};

export default Page;
