import supabase from "@/server/supabase";
import { z } from "zod";

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
        .select("id, title, color");

    if (error) {
        console.error("Error getting courses: ", error);
        throw error;
    }

    return courseList || [];
}

export async function deleteCourse(courseID: string) {
    const { error } = await supabase
        .from("courses")
        .delete()
        .eq("id", courseID);

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
        (a, b) =>
            new Date(a.examDate).getTime() - new Date(b.examDate).getTime(),
    );
    return exams || [];
}

interface Assignments {
    priority: Assignment[];
    overdue: Assignment[];
    dueToday: Assignment[];
}
export async function getCategorizedAssignments() {
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
    assignments.priority = priority || [];
    assignments.overdue = overdue || [];
    assignments.dueToday = dueToday || [];

    return assignments;
}

export async function getOverdueAssignments() {
    const currentDateIso = new Date().toISOString();
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
    assignments.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    );
    return assignments || [];
}
