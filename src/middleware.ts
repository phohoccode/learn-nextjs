import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const url = request.url;
  const { pathname } = new URL(url);
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log(">>> request", request);
  console.log(">>> token", token);
  console.log(">>> pathname", pathname);

  if (token) {
    if (pathname === "/projects" && token.role === "admin") {
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
