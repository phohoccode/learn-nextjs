import { Suspense } from "react";
import Loading from "./loading";
import ProductTable from "@/components/Products/ProductTable";

const Page = async () => {
  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();


  return (
    <Suspense fallback={<Loading />}>
      <ProductTable data={products} />
    </Suspense>
  );
};

export default Page;
