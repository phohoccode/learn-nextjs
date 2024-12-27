export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="text-center py-10">
        <h1 className="text-5xl text-blue-500 font-bold">
          Học Next.js dễ dàng
        </h1>
        <p className="mt-4 text-xl text-gray-700">
          Chào mừng bạn đến với trang web học Next.js.
        </p>
      </header>

      <section className="w-full max-w-4xl px-6 py-8 bg-white shadow-lg rounded-md mt-10">
        <h2 className="text-3xl font-semibold text-gray-800">
          Khám Phá Next.js
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Next.js là một framework React mạnh mẽ giúp phát triển các ứng dụng
          web với hiệu suất tối ưu.
        </p>
        <div className="mt-6 flex justify-center">
          <a
            target="_blank"
            href="https://nextjs.org/"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition duration-300"
          >
            Tìm Hiểu Thêm
          </a>
        </div>
      </section>

      <footer className="mt-10 text-center py-4 text-gray-600">
        <p>© 2024 Học Next.js - phoccode</p>
      </footer>
    </div>
  );
}
