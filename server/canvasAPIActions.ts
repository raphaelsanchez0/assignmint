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
  const initialUrl = "users/self/courses";
  return fetchAllPages(initialUrl, fetchCourses);
}

/**
 * A specific fetch function for getting courses.
 * @param {string} url The URL to fetch courses from.
 * @returns {Promise<any>} The response from the fetch operation.
 */
async function fetchCourses(url: string) {
  const key = await getCanvasKey(); // Assume this function gets your API key
  return canvasAPI.get(url, {
    headers: {
      Authorization: `Bearer ${key}`,
    },
  });
}

export async function getCourseAssignmentsFromCanvas(course: Course) {
  const initialUrl = `users/self/courses/${course.canvasCourseID}/assignments`;
  return fetchAllPages(initialUrl, fetchAssignmentsForCourse);
}

async function fetchAssignmentsForCourse(url: string) {
  const key = await getCanvasKey();
  return canvasAPI.get(url, {
    headers: {
      Authorization: `Bearer ${key}`,
    },
  });
}

/**
 * Fetches all pages of data from a paginated API, automatically applying a limit of 10 items per page.
 * @param {string} initialUrl The initial URL to fetch from, without per_page parameter.
 * @param {function(string): Promise<any>} fetchFunction A function that performs the fetch operation.
 * @returns {Promise<any[]>} A promise that resolves to an array containing all fetched data.
 */
const fetchAllPages = async (
  initialUrl: string,
  fetchFunction: (url: string) => any,
) => {
  let nextPageUrl = initialUrl.includes("?")
    ? `${initialUrl}&per_page=10`
    : `${initialUrl}?per_page=10`;
  const allData = [];

  while (nextPageUrl) {
    const response = await fetchFunction(nextPageUrl);
    allData.push(...response.data);

    const linkHeader = response.headers.link;
    const links = parseLinkHeader(linkHeader);
    nextPageUrl = links.next ? links.next : null;
  }

  return allData;
};

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

export async function linkCanvasCoursesToAssignmintCourses(
  canvasCourses: ModifiedCanvasCourse[],
) {
  canvasCourses.map(async (canvasCourse) => {
    if (canvasCourse.assignmintID != undefined) {
      await linkCourses(canvasCourse, true);
    } else {
      await linkCourses(canvasCourse, false);
    }
  });
}

async function linkCourses(
  canvasCourse: ModifiedCanvasCourse,
  isLinking: boolean,
) {
  const canvasCourseID = canvasCourse.id;
  const assignmintID = canvasCourse.assignmintID;
  if (isLinking) {
    const { error } = await supabase
      .from("courses")
      .update({
        canvasCourseID: canvasCourseID,
        canvasCourseName: canvasCourse.name,
      })
      .eq("id", assignmintID);

    if (error) {
      console.error(error);
      throw error;
    }
  } else {
    const { error } = await supabase
      .from("courses")
      .update({
        canvasCourseID: null,
        canvasCourseName: null,
      })
      .eq("canvasCourseID", canvasCourseID);

    if (error) {
      console.error(error);
      throw error;
    }
  }
}
