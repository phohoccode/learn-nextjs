const ProductItem = ({ data }: any) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {data?.category?.id}
      </th>
      <td className="px-6 py-4"> {data?.category?.name}</td>
      <td className="px-6 py-4"> {data?.title}</td>
      <td className="px-6 py-4"> {data?.description}</td>
      <td className="px-6 py-4">$ {data?.price}</td>
    </tr>
  );
};

export default ProductItem;
