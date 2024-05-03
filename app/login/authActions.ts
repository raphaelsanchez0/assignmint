"use server";

import getURL from "@/utils/getURL";
import { createSupabaseActionClient } from "@/utils/supabase/supabaseActionClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signInWithEmailAndPassword(
  email: string,
  password: string,
) {
  const cookieStore = cookies();
  const supabase = await createSupabaseActionClient(cookieStore);
  const credentials = { email, password };

  return await supabase.auth.signInWithPassword(credentials);
}

export async function signUpWithEmailAndPassword(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) {
  const cookieStore = cookies();
  const supabase = await createSupabaseActionClient(cookieStore);

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: `${getURL}/dashboard`,
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`,
      },
    },
  });
  console.log(data);
  console.log(error);
  if (data) {
    return {
      status: "success",
      message: "Signup successful.",
    };
  }

  if (error) {
    return {
      status: "error",
      message: error.message || "An unknown error occurred.",
    };
  }
}

export async function signInWithOAuth() {
  const cookieStore = cookies();
  const supabase = await createSupabaseActionClient(cookieStore);

  return await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${getURL}/dashboard`,
    },
  });
}
