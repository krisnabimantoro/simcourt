// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value;

  if (!token) {
    const publicPaths = ["/auth", "/register", "/public", "/api"]; // List of public pages
    const isPublicPath = publicPaths.some((path) => req.nextUrl.pathname.startsWith(path));

    if (!isPublicPath) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }
  if (req.nextUrl.pathname.startsWith("/_next/image")) {
    return NextResponse.next();
  }
  return NextResponse.next();
}

// Protect all routes except login, register, public, and static files
export const config = {
  matcher: [
    "/((?!api/|auth|register|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|svg|gif|webp|ico|css|js|woff|woff2|ttf)).*)",
  ],
};
