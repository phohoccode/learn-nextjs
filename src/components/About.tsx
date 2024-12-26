import Image from "next/image";
import avartar from "../../public/avartar.jpg";

const About = () => {
  return (
    <div className="flex gap-5">
      <Image
        src={avartar}
        alt="avartar"
        width={200}
        height={200}
        className="rounded-full"
      />
      <div>
        <h1 className="text-2xl font-bold">Nhan Quốc Việt</h1>
        <p className="text-gray-500">Frontend Developer</p>
        <p className="text-gray-500">Email: phohoccode@gmail.com</p>

        <button
          type="button"
          className="py-2 px-4 mt-5 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  opacity-70  rounded-lg "
        >
          Thay đổi ảnh đại diện
        </button>
      </div>
    </div>
  );
};

export default About;
