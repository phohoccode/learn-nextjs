export const formatTime = (time: string) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  0;
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const genaratePagination = (currentPage: number, totalPage: number) => {
  if (totalPage <= 7) {
    return Array.from({ length: totalPage }, (_, index) => index + 1);
  }

  // nếu trang hiện tại thì hiển thị 3 trang trước và 2 trang cuối cùng
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPage - 1, totalPage];
  }

  // nếu trang hiện tại ở giữa thì hiển thị 2 trang đầu, 3 trang cưới cùng
  if (currentPage >= totalPage - 2) {
    return [1, 2, "...", totalPage - 2, totalPage - 1, totalPage];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPage,
  ];
};
