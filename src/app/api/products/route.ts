export const revalidate = 60; // 

export async function GET() {
  try {
    const res = await fetch("https://api.escuelajs.co/api/v1/products");
    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    console.error("Error connecting to database:", error);
    return new Response("Error fetching products", { status: 500 });
  }
}
