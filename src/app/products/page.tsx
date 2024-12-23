import ProductList from "@/components/Products/ProducList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sản phẩm",
  description: "Danh sách sản phẩm của PHO-BLOG",
};

const Page = () => {
  return (
    <div>
      <ProductList />
    </div>
  );
};

export default Page;
