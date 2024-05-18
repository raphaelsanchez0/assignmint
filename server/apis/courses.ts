import { courseFormSchema } from "@/lib/schemas";
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

export async function createCourse(input: any) {
  const result = courseFormSchema.safeParse(input);

  if (!result.success) {
    console.error("Validation failed", result.error);
    return { error: result.error };
  }
  const parsedData = result.data;
  console.log(parsedData);

  const { data, error } = await supabase.from("courses").insert([{
    title: parsedData.title,
    color: parsedData.color,
  }]).select();

  if (error) {
    console.log(error);
    return error;
  }
}

export async function getCourses(): Promise<Course[]> {
  const { data: courseList, error } = await supabase
    .from("courses")
    .select("id, title, color, canvasCourseID, canvasCourseName")
    .order("id");

  if (error) {
    console.error("Error getting courses: ", error);
    throw error;
  }

  return courseList || [];
}

export async function getCourse(id: string): Promise<Course> {
  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id);

  if (error) {
    throw error;
  }

  return course[0];
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
