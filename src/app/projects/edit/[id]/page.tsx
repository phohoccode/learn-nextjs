import EditProject from "@/components/Projects/EditProject";
import { fetchProjectById } from "@/lib/data";

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const id = params.id;
  
  const data = await fetchProjectById(id);

  return (
    <div>
      <EditProject data={data} />
    </div>
  );
};

export default Page;
