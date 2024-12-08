"use server";

import getURL from "@/utils/getURL";
import { createSupabaseActionClient } from "@/utils/supabase/supabaseActionClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signInWithEmailAndPassword(
  email: string,
  password: string
): Promise<{ success: boolean; message: string }> {
  const cookieStore = cookies();
  const supabase = await createSupabaseActionClient(cookieStore);

  try {
    const res = await supabase.auth.signInWithPassword({ email, password });

    if (res.error) {
      return { success: false, message: res.error.message };
    }

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    return { success: false, message: "An unexpected error occurred." };
  }
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
