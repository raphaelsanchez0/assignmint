import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: { url: string | URL }) {
  const requestURL = new URL(request.url);
  const code = requestURL.searchParams.get("code");
  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    await supabase.auth.exchangeCodeForSession(code);
  }
  return NextResponse.redirect(requestURL.origin);
}
