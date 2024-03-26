"use server";
import { canvasAPIFormSchema } from "@/lib/schemas";
import { createSupabaseServerClient } from "@/utils/supabase/supabaseServerClient";

const supabase = createSupabaseServerClient();

export async function setCanvasKey(input: any) {
  const result = canvasAPIFormSchema.safeParse(input);

  if (!result.success) {
    console.error("Validation failed", result.error);
    return { error: result.error };
  }

  const key = result.data.canvasAPIKey;
  const userID = (await supabase.auth.getUser()).data.user?.id;

  const { error } = await supabase
    .from("profiles")
    .update({ canvas_key: key })
    .eq("id", userID);
  if (error) {
    console.log(error);
    throw error;
  }
}

export async function testAPIKey(key: string) {}
