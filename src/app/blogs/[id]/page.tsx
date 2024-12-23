"use client";

import { blogListData } from "@/lib/data";
import { useParams } from "next/navigation";
import Error from "./error";
import { useEffect, useState } from "react";
import { Blog } from "@/lib/type";
import Loading from "./loading";

const Page = () => {
  const params = useParams();
  const dataBlog = blogListData.find((item) => item.id == +(params.id ?? 0));
  const [data, setData] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (dataBlog) {
        setData(dataBlog);
      }
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.id) {
    return <Error />;
  }

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.content}</p>
    </div>
  );
};

export default Page;
