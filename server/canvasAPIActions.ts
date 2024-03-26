"use server";
import { canvasAPIFormSchema } from "@/lib/schemas";
import { createSupabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import axios from "axios";
import { error } from "console";

const supabase = createSupabaseServerClient();

const canvasAPI = axios.create({
  baseURL: "https://canvas.instructure.com/api/v1",
});

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

export async function setCanvasKey(key: string) {
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

async function getCanvasKey() {
  const { data, error } = await supabase.from("profiles").select("canvas_key");

  if (data) {
    const key = data[0].canvas_key;

    if (key === null) {
      return false;
    } else {
      return key;
    }
  }
}

export async function getCanvasCourses() {
  const url = "users/self/courses";

  const key = await getCanvasKey();
  try {
    const response = await canvasAPI.get(url, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
