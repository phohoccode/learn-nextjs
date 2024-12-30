"use server";

import { signIn } from "@/auth";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { response } from "./type";

// nguyên nhân client không nhận response -> tồn tại redirect

// ========================== Try-Catch ===========================
export async function createProject(
  name: string,
  description: string,
  demo: string
): Promise<response> {
  try {
    await sql`
      INSERT INTO projects (name, description, demo) 
      VALUES (${name}, ${description}, ${demo})
    `;

    return {
      status: "success",
      message: "Dự án đã được tạo thành công!",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Đã có lỗi xảy ra, vui lòng thử lại",
    };
  } finally {
    revalidatePath("/projects");
  }
}

export async function deleteProject(id: string): Promise<response> {
  try {
    await sql`
      DELETE FROM projects WHERE id = ${id}
    `;

    return {
      status: "success",
      message: "Dự án đã được xóa thành công!",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Đã có lỗi xảy ra, vui lòng thử lại!",
    };
  } finally {
    revalidatePath("/projects");
  }
}

export async function updateProject(
  id: string,
  name: string,
  description: string,
  demo: string
): Promise<response> {
  try {
    await sql`
      UPDATE projects
      SET name = ${name}, description = ${description}, demo = ${demo}
      WHERE id = ${id}
    `;

    return {
      status: "success",
      message: "Dự án đã được cập nhật thành công!",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Đã có lỗi xảy ra, vui lòng thử lại!",
    };
  } finally {
    revalidatePath("/projects");
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const user = await sql`
      SELECT * FROM users WHERE email = ${email} AND password = ${password}
    `;

    if (user.rows.length === 0) {
      return null;
    }

    console.log(">>> user", user.rows[0]);
    return user.rows[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function registerUser(
  email: string,
  password: string
): Promise<response> {
  try {
    const find_user = await sql`
        SELECT * FROM users WHERE email = ${email}
    `;

    if (find_user?.rows?.length > 0) {
      return {
        status: "error",
        message: "Email đã tồn tại, vui lòng chọn email khác!",
      };
    }

    const user = await sql`
        INSERT INTO users (email, password) 
        VALUES (${email}, ${password})
        RETURNING *
    `;

    if (user?.rows?.length === 0) {
      return {
        status: "error",
        message: "Đăng ký thất bại, vui lòng thử lại!",
      };
    }

    return {
      status: "success",
      message: "Đăng ký thành công!",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Lỗi xảy ra, vui lòng thử lại!",
    };
  }
}

export const fetchUser = async (email: string): Promise<response> => {
  try {
    const user = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (user?.rows?.length === 0) {
      return {
        status: "error",
        message: "Người dùng không tồn tại!",
      };
    }

    return {
      status: "success",
      message: "Lấy thông tin người dùng thành công!",
      data: user.rows[0],
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Lỗi xảy ra, vui lòng thử lại!",
    };
  }
};

// ========================== Không sử dụng Try-Catch ===========================

export const createUser = async (
  prevState: any,
  formData: FormData
): Promise<response> => {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const find_user = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;

  if (find_user?.rows?.length > 0) {
    return {
      status: "error",
      message: "Email đã tồn tại, vui lòng chọn email khác!",
    };
  }

  const user = await sql`
    INSERT INTO users (name, email, password) 
    VALUES (${username}, ${email}, ${password})
    RETURNING *
  `;

  if (user?.rows?.length === 0) {
    return {
      status: "error",
      message: "Đăng ký thất bại, vui lòng thử lại!",
    };
  }

  return {
    status: "success",
    message: "Đăng ký tài khoản thành công!",
  };
};

// =============================== AUTH.JS ===============================
export async function authenticate(
  email: string,
  password: string
): Promise<response> {
  try {
    const response = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
      callbackUrl: "/",
    });

    return {
      status: "success",
      message: "Đăng nhập thành công!",
    };
  } catch (error: any) {
    console.log(">>> actions-error", error);

    switch (error?.code) {
      case "invalid_credentials":
        return { status: "error", message: error?.details };
      case "zod_error":
        return { status: "error", message: error?.details };
      default:
        return {
          status: "error",
          message: "Đã có lỗi xảy ra, vui lòng thử lại!!!",
        };
    }
  }
}
