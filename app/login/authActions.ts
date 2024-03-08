"use server";

import getURL from "@/utils/getURL";
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

export async function signUpWithEmailAndPassword(credentials: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const supabase = await createSupabaseActionClient(cookieStore);

  return await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      emailRedirectTo: `${getURL}/dashboard`,
      data: {
        first_name: credentials.firstName,
        last_name: credentials.lastName,
        full_name: `${credentials.firstName} ${credentials.lastName}`,
      },
    },
  });
}

export async function signInWithOAuth() {
  const supabase = await createSupabaseActionClient(cookieStore);

  return await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${getURL}/dashboard`,
    },
  });
}
