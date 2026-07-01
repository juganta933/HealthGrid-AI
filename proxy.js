import { NextResponse } from "next/server";

export function proxy(request) {
  const path = request.nextUrl.pathname;
  const userRole = request.cookies.get("userRole")?.value;

  const isAdminRoute = path.startsWith("/admin");
  const isAdminLoginPage = path === "/admin/login";

  const isStaffRoute = path.startsWith("/staff");

  if (isAdminRoute && !isAdminLoginPage && userRole !== "admin") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isStaffRoute && userRole !== "staff") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/staff/:path*"],
};