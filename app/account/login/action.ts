"use server";

import { createSupabaseActionClient } from "@/utils/supabase/supabaseActionClient";
import { createSupabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  const session = await supabase.auth.getSession();

  if (error) {
    redirect("/error");
  }

  redirect("/dashboard");
}
