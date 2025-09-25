import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseReqResClient } from "./utils/supabase/supabaseMiddlewareClient";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = await createSupabaseReqResClient(req, res);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if user is signed in and the current path is / redirect the user to /dashboard
  if (user && req.nextUrl.pathname === "/") {
    console.log("user is signed in and the current path is /");
    return NextResponse.redirect(new URL("/auth/callback", req.url));
  }
  //if user tries to go back to any account page after logging in, redirect to dashboard

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && req.nextUrl.pathname !== "/") {
    console.log("user is not signed in and the current path is not /");
    return NextResponse.redirect(new URL("/sign-in-error", req.url));
  }
  return res;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/assignments/:path*",
    "/exams/:path*",
    "/calendar/:path*",
    "/settings/:path*",
    "/import/:path*",
    "/onboarding/:path*"
  ],
};
