"use client";

import { genaratePagination } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const Pagination = ({ totalPage }: { totalPage: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const allPages = genaratePagination(currentPage, totalPage);

  const createPageUrl = (page: number | string) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", page.toString());

    return `${pathname}?${params.toString()}`;
  };

  return (
    <>
      <div className="flex gap-2 justify-center mt-4">
        {allPages.map((page, index) => (
          <Link
            key={index}
            href={createPageUrl(page)}
            className={`${
              currentPage !== page
                ? "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                : "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            }`}
          >
            {page}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Pagination;
