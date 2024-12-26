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
        <form className="flex-1">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Tìm kiếm
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tìm kiếm..."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Tìm kiếm
            </button>
          </div>
        </form>
        <Link
          href="/projects/create"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center"
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
