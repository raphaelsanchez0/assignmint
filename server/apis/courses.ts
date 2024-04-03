import { createSupabaseFrontendClient } from "@/utils/supabase/supabaseFrontendClient";
import { z } from "zod";

const supabase = createSupabaseFrontendClient();
const addCouseSchema = z.object({
  id: z
    .number()
    .min(1, "Course is required")
    .or(z.string().min(1, "Course is required"))
    .optional(),
  title: z.string().min(1, "Course is required"),
  color: z.string().min(1, "Color is required"),
});

export async function createOrUpdateCourse(
  courseID: string,
  courseName: string,
  courseColor: string,
) {
  const validatedCourse = addCouseSchema.parse({
    id: courseID,
    title: courseName,
    color: courseColor,
  });

  const { error } = await supabase
    .from("courses")
    .upsert(validatedCourse, { onConflict: "id" });

  if (error) {
    console.error("Error creating or updating course: ", error);
    throw error; // or handle the error as needed
  }
}

export async function getCourses() {
  const { data: courseList, error } = await supabase
    .from("courses")
    .select("id, title, color, canvasCourseID")
    .order("id");

  if (error) {
    console.error("Error getting courses: ", error);
    throw error;
  }

  return courseList || [];
}

export async function deleteCourse(courseID: string) {
  const { error } = await supabase.from("courses").delete().eq("id", courseID);

  if (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
}

export async function deleteAllCourses() {
  const { error } = await supabase.from("courses").delete().gt("id", 0);
}
