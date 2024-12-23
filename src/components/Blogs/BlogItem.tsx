import { Blog } from "@/lib/type";
import { formatTime } from "@/lib/utils";
import Link from "next/link";

const BlogItem = (props: { key: number; data: Blog }) => {
  const { data } = props;

  return (
    <Link href={`/blogs/${data.id}`}>
      <div className="flex flex-col space-y-2 p-4 border border-gray-200 rounded-md">
        <div className="flex items-center gap-2">
          <h4 className="text-blue-500">{data.username} - {data.id}</h4>
          <span className="text-xs text-slate-500">
            {formatTime(data.time)}
          </span>
        </div>
        <h3 className="text-slate-900">{data.title}</h3>
        <p>{data.content}</p>
      </div>
    </Link>
  );
};

export default BlogItem;
