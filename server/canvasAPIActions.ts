"use server";
import { canvasAPIFormSchema } from "@/lib/schemas";
import { createSupabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import axios from "axios";

const supabase = createSupabaseServerClient();

const canvasAPI = axios.create({
  baseURL: "https://canvas.instructure.com/api/v1",
});

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

export async function validateCanvasKey(key: string) {
  const url = "/users/self";

  try {
    const response = await canvasAPI.get("users/self", {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
  }
}
