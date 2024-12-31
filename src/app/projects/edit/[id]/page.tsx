import EditProject from "@/components/Projects/EditProject";
import { fetchProjectById } from "@/lib/data";
import { Suspense } from "react";
import Loading from "./loading";

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const id = params.id;

  const data = await fetchProjectById(id);

  return (
    <Suspense fallback={<Loading />}>
      <EditProject data={data} />
    </Suspense>
  );
};

export default Page;
