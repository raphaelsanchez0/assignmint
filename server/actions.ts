"use server";
import { revalidatePath } from "next/cache";

import { z } from "zod";
import { QueryClient } from "@tanstack/react-query";
import { createSupabaseActionClient } from "@/utils/supabase/supabaseActionClient";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { addAssignmentFormSchema, addExamFormSchema } from "@/lib/schemas";

const cookieStore = cookies();
const supabase = createSupabaseServerClient();

const queryClient = new QueryClient();

export async function createAssignment(input: any) {
  const result = addAssignmentFormSchema.safeParse(input);

  if (!result.success) {
    console.error("Validation failed", result.error);
    return { error: result.error };
  }
  const parsedData = result.data;

  const dueDate = new Date(parsedData.dueDate);

  const { data, error } = await supabase.from("assignments").insert({
    ...parsedData,
    dueDate,
  });
  queryClient.invalidateQueries({
    queryKey: ["dueTodayAssignments", "assignments"],
  });
  if (error) {
    console.log(error);
  }
}

export async function createExam(input: any) {
  const result = addExamFormSchema.safeParse(input);

  if (!result.success) {
    console.error("Validation failed", result.error);
    return { error: result.error };
  }
  const parsedData = result.data;

  const examDate = new Date(parsedData.examDate);

  const { error } = await supabase.from("exams").insert({
    ...parsedData,
    examDate,
  });
  queryClient.invalidateQueries({
    queryKey: ["exams"],
  });

  if (error) {
    throw error;
  }
}

const updateAssignmentFormSchema = z.object({
  course: z.string().min(1, "Course is required"),
  title: z.string().min(1, "Title is required"),
  dueDate: z.string().min(1, "Due date is required"),
  priority: z.boolean(),
  notes: z.string().optional(),
});

export async function updateAssignment(prevState: any, formData: FormData) {
  const parsedData = updateAssignmentFormSchema.parse({
    course: formData.get("course"),
    title: formData.get("title"),
    dueDate: formData.get("dueDate"),
    priority: formData.get("priority") === "on",
    notes: formData.get("notes"),
  });

  const dueDate = new Date(parsedData.dueDate);
  const { error } = await supabase
    .from("assignments")
    .update({
      ...parsedData,
      dueDate,
    })
    .eq("id", formData.get("id"));

  if (error) {
    throw error;
  }
  return formData;
}
const updateExamFormSchema = z.object({
  course: z.string().min(1, "Course is required"),
  title: z.string().min(1, "Title is required"),
  examDate: z.string().min(1, "Due date is required"),
  notes: z.string().optional(),
});

export async function updateExam(prevState: any, formData: FormData) {
  const parsedData = updateExamFormSchema.parse({
    course: formData.get("course"),
    title: formData.get("title"),
    examDate: formData.get("examDate"),
    notes: formData.get("notes"),
  });

  const examDate = new Date(parsedData.examDate);

  const { error } = await supabase
    .from("exams")
    .update({
      ...parsedData,
      examDate,
    })
    .eq("id", formData.get("id"));

  if (error) {
    console.log(error);
  }
}

export async function getCourses() {
  const { data: courseList, error } = await supabase
    .from("courses")
    .select("id, title, color");

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
export async function getExams() {
  const { data: exams, error } = await supabase.from("exams").select(`
    *,
    course(*)
    `);

  if (error) {
    console.error("Error getting exams: ", error);
    throw error;
  }
  exams.sort(
    (a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime(),
  );
  return exams || [];
}

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

export async function getAssignments() {
  const { data: assignments, error } = await supabase.from("assignments")
    .select(`
    *,
    course(*)
    `);

  if (error) {
    console.error("Error getting assignments: ", error);
    throw error;
  }

  return assignments || [];
}

interface Assignments {
  priority: Assignment[];
  overdue: Assignment[];
  dueToday: Assignment[];
}
export async function getCategorizedAssignments() {
  "use server";
  let assignments: Assignments = {
    priority: [],
    overdue: [],
    dueToday: [],
  };

  const currentDateIso = new Date().toISOString();
  const { data: priority, error: priorityError } = await supabase
    .from("assignments")
    .select(
      `
    *,
    course(*)
    `,
    )
    .eq("priority", true);

  const { data: overdue, error: overdueError } = await supabase
    .from("assignments")
    .select(
      `
    *,
    course(*)
    `,
    )
    .lt("dueDate", currentDateIso) // Use ISO formatted date
    .order("dueDate", { ascending: true });

  const { data: dueToday, error: dueTodayError } = await supabase
    .from("assignments")
    .select(
      `
    *,
    course(*)
    `,
    )
    .eq("dueDate", currentDateIso) // Use ISO formatted date
    .order("dueDate", { ascending: true });
  //Error checking
  if (priorityError || overdueError || dueTodayError) {
    console.error(
      "Error getting assignments: ",
      priorityError,
      overdueError,
      dueTodayError,
    );
    throw priorityError || overdueError || dueTodayError;
  }

  // Assigning values to the assignments object
  return {
    priority: priority || [],
    overdue: overdue || [],
    dueToday: dueToday || [],
  };
}

export async function getOverdueAssignments() {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const currentDateIso = currentDate.toISOString();
  const { data, error } = await supabase
    .from("assignments")
    .select(
      `
        *,
        course(*)
        `,
    )
    .lt("dueDate", currentDateIso) // Use ISO formatted date
    .order("dueDate", { ascending: true });

  if (error) {
    console.error("Error getting assignments: ", error);
    throw error;
  }
  return data;
}

export async function deleteExam(id: number) {
  const { data, error } = await supabase.from("exams").delete().eq("id", id);

  if (error) {
    console.error("Error deleting exam: ", error);
    throw error;
  }
}

export async function deleteAssignment(id: number) {
  const { data, error } = await supabase
    .from("assignments")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting assignment: ", error);
    throw error;
  }
}
