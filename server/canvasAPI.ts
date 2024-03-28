import { createSupabaseFrontendClient } from "@/utils/supabase/supabaseFrontendClient";
import { createSupabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import axios from "axios";
import { getUser, getUserID } from "./apis/user";

const supabase = createSupabaseFrontendClient();

const canvasAPI = axios.create({
  baseURL: "https://canvas.instructure.com/api/v1",
});

export async function getCanvasKey() {
  try {
    const userID = await getUserID();
    const { data, error } = await supabase
      .from("profiles")
      .select("canvas_key")
      .eq("id", userID)
      .single();
    if (error) {
      throw error;
    }
    console.log(data?.canvas_key);
    return data?.canvas_key || false;
  } catch (error) {
    return false;
  }
}

export async function getAllCanvasCourses() {
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
