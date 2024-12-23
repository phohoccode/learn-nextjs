import { Product } from "@/lib/type";
import Image from "next/image";
import image from "./images/phoflix-v2.png";
import { formatTime } from "@/lib/utils";

const ProductItem = (props: { key: number; data: Product }) => {
  const { data } = props;

  return (
    <div className="flex gap-2 border border-gray-200 rounded-md p-2">
      <Image
        src={image}
        alt={data.name}
        width={200}
        height={200}
        className="border-gray-100 border rounded-md"
      />
      <div className="flex flex-col gap-2 flex-auto">
        <div className="flex items-center gap-2">
          <h4 className="text-blue-500">{data.name}</h4>
          <span className="text-slate-500 text-xs">
            {formatTime(data.time)}
          </span>
        </div>
        <p>{data.description}</p>
        <a
          href={data.link}
          className="text-blue-700"
          target="_blank"
          referrerPolicy="no-referrer"
        >
          {data.link}
        </a>
      </div>
    </div>
  );
};

export default ProductItem;
