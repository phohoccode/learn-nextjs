"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(
  name: string,
  description: string,
  demo: string
) {
  try {
    await sql`
      INSERT INTO projects (name, description, demo) 
      VALUES (${name}, ${description}, ${demo})
    `;

    return {
      success: true,
      message: "Dự án đã được tạo thành công",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Đã có lỗi xảy ra, vui lòng thử lại",
    };
  } finally {
    revalidatePath("/projects");
    redirect("/projects");
  }
}

export async function deleteProject(id: string) {
  try {
    await sql`
      DELETE FROM projects WHERE id = ${id}
    `;

    return {
      success: true,
      message: "Dự án đã được xóa thành công",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Đã có lỗi xảy ra, vui lòng thử lại",
    };
  } finally {
    revalidatePath("/projects");
    redirect("/projects");
  }
}

export async function updateProject(
  id: string,
  name: string,
  description: string,
  demo: string
) {
  try {
    await sql`
      UPDATE projects
      SET name = ${name}, description = ${description}, demo = ${demo}
      WHERE id = ${id}
    `;

    return {
      success: true,
      message: "Dự án đã được cập nhật thành công",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Đã có lỗi xảy ra, vui lòng thử lại",
    };
  } finally {
    revalidatePath("/projects");
    redirect("/projects");
  }
}
