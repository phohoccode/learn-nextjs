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
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            } px-4 py-2 rounded`}
          >
            {page}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Pagination;
