"use client";

import { blogListData } from "@/lib/data";
import { Blog } from "@/lib/type";
import BlogItem from "./BlogItem";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import { useSearchParams } from "next/navigation";

const BlogList = () => {
  const [blogList, setBlogList] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const totalPage = Math.ceil(blogListData.length / 5);
  const count = 5;

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    const start = count * page - (count - 1);
    const end = count * page;
    const filteredData = blogListData.slice(start - 1, end);

    setIsLoading(true);
    setTimeout(() => {
      setBlogList(filteredData);
      setIsLoading(false);
    }, 1000);
  }, [searchParams]);

  if (isLoading) {
    return <h4 className="text-blue-500">Đang tải danh sách nhật kí...</h4>;
  }

  return (
    <>
      <div className="flex flex-col space-y-4">
        {blogList.map((item: Blog, index: number) => (
          <BlogItem key={index} data={item} />
        ))}
      </div>

      <Pagination totalPage={totalPage} />
    </>
  );
};

export default BlogList;
