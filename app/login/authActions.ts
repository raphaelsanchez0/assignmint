"use server";

import { createSupabaseActionClient } from "@/utils/supabase/supabaseActionClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieStore = cookies();

export async function signInWithEmailAndPassword(credentials: {
  email: string;
  password: string;
}) {
  const supabase = await createSupabaseActionClient(cookieStore);

  return await supabase.auth.signInWithPassword(credentials);
}
