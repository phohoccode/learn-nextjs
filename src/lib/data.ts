import { db } from "@vercel/postgres";

const client = await db.connect();

export const fectAllProjects = async () => {
  const data = await client.query("SELECT * FROM projects");
  return data.rows;
};

export const item_per_page = 5;
export const fetchProjectList = async ({
  currentPage,
}: {
  currentPage: number;
}) => {
  const offset = (currentPage - 1) * item_per_page;


  const data = await client.query(`
    SELECT * FROM projects 
    ORDER BY create_at DESC
    LIMIT ${item_per_page} OFFSET ${offset}  
  `);

  return data.rows;
};

export const fetchProjectById = async (id: string) => {
  const data = await client.query("SELECT * FROM projects WHERE id = $1", [id]);
  return data.rows[0];
};
