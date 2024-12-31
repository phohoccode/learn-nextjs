"use client";

import ProductItem from "./ProductItem";

const ProductTable = ({ data }: any) => {
  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-2">
                Id
              </th>
              <th scope="col" className="px-6 py-2">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-2">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((product: any, index: number) => (
              <ProductItem data={product} key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductTable;
