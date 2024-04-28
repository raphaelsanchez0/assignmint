import { createSupabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    await supabase.auth.signOut();
  }

  return NextResponse.redirect(new URL("/", req.url), {
    status: 302,
  });
}
