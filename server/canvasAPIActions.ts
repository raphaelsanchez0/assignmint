"use server";
import { canvasAPIFormSchema } from "@/lib/schemas";
import { createSupabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import axios from "axios";

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
    throw error;
  }
}

export async function getCanvasKey() {
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

export async function getAllCanvasCourses(): Promise<CanvasCourse[]> {
  const courses = [];
  let nextPageUrl: string | null = "users/self/courses?per_page=10";

  const key = await getCanvasKey();

  while (nextPageUrl) {
    try {
      const response = await canvasAPI.get(nextPageUrl, {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      });

      courses.push(...response.data);

      const linkHeader = response.headers.link;
      const links = parseLinkHeader(linkHeader);

      if (links.next) {
        // If there's a next page, update nextPageUrl to fetch the next page in the next iteration
        nextPageUrl = links.next;
      } else {
        // If there's no next page, break the loop
        nextPageUrl = null;
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      break;
    }
  }

  return courses;
}

function parseLinkHeader(header: any) {
  if (!header || header.length === 0) {
    return {};
  }

  return header
    .split(",")
    .reduce((acc: { [key: string]: string }, part: string) => {
      const section = part.split(";");
      if (section.length !== 2) {
        throw new Error("section could not be split on ';'");
      }
      const url = section[0].replace(/<(.*)>/, "$1").trim();
      const name = section[1].replace(/rel="(.*)"/, "$1").trim();
      acc[name] = url;
      return acc;
    }, {});
}

export async function getEnrollmentTerms() {
  const url = "accounts/self/terms";

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
