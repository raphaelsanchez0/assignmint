import { createSupabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { createClient } from "@supabase/supabase-js";

export async function getUser() {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    throw error;
  }
  return data.user;
}

export async function getUserID() {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    throw error;
  }
  return data.user.id;
}
