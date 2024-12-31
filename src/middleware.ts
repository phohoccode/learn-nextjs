import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const allowedPaths = ["/projects", "/project-management"];

export async function middleware(request: NextRequest) {
  const url = request.url;
  const { pathname } = new URL(url);
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token) {
    const isAllowedParth = allowedPaths.some((path) =>
      pathname.startsWith(path)
    );
    if (isAllowedParth && token.role === "admin") {
      return NextResponse.next();
    } else {
      return NextResponse.json(
        { message: "Bạn không có quyền truy cập" },
        { status: 403 }
      );
    }
  }

  return NextResponse.redirect(new URL("/auth/login", request.url));
}

export const config = {
  matcher: "/projects/:path*",
};
