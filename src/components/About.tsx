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
      </div>
    </div>
  );
};

export default About;
