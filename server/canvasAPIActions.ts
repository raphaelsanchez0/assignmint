"use server";
import { canvasAPIFormSchema } from "@/lib/schemas";
import { createSupabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import axios from "axios";
import { string } from "zod";

const supabase = createSupabaseServerClient();

const canvasAPI = axios.create({
  baseURL: "https://canvas.instructure.com/api/v1",
});

export async function getCanvasKey() {}

export async function validateCanvasKey(key: string) {
  const url = "users/self";
  try {
    const response = await canvasAPI.get(url, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    if (response.status === 200) {
      await setCanvasKey(key);
      return true;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return { message: "Invalid API Key. Make sure the key is correct" };
      }
    }
  }
}

async function setCanvasKey(key: string) {
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

export async function getCanvasCourses() {
  const url = "users/self/courses";

  // try{
  //   const response = await canvasAPI.get(url,{

  //   })
  // }
}
