"use client";

import { productListData } from "@/lib/data";
import ProductItem from "./ProductItem";
import { useEffect, useState } from "react";
import { Product } from "@/lib/type";

const ProductList = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProductList(productListData);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <h4 className="text-blue-500">Đang tải danh sách sản phẩm...</h4>;
  }

  return (
    <div className="flex flex-col space-y-4">
      {productList.map((item, index: number) => (
        <ProductItem key={index} data={item} />
      ))}
    </div>
  );
};

export default ProductList;
