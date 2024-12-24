import { Project } from "@/lib/type";
import ButtonDelete from "./ButtonDelete";
import Link from "next/link";

const ProjectList = async ({ data }: any) => {

  return (
    <div className="mt-8">
      <ul className="flex flex-col gap-2">
        {data.map((project: Project) => (
          <li
            key={project.id}
            className="flex gap-2 border p-2 rounded-md border-gray-200"
          >
            <div className="flex-1">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <a
                href={project.demo}
                target="_blank"
                className="text-blue-500 underline"
              >
                {project.demo}
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                href={`/projects/edit/${project.id}`}
                className="bg-emerald-600 p-2 rounded-md text-white"
              >
                Chỉnh sửa
              </Link>
              <ButtonDelete id={project.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
