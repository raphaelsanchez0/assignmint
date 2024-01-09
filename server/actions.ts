"use server";
import { revalidatePath } from "next/cache";
import { addDoc, collection } from "firebase/firestore";
import supabase from "@/server/supabase";
import { z } from "zod";

const addAssignmentFormSchema = z.object({
    course: z.string().min(1, "Course is required"),
    title: z.string().min(1, "Title is required"),
    dueDate: z.string().min(1, "Due date is required"),
    notes: z.string().optional(),
});

export async function createAssignment(prevState: any, formData: FormData) {
    const parsedData = addAssignmentFormSchema.parse({
        course: formData.get("course"),
        title: formData.get("title"),
        dueDate: formData.get("dueDate"),
        notes: formData.get("notes"),
    });

    const dueDate = new Date(parsedData.dueDate);

    const { error } = await supabase.from("assignments").insert({
        ...parsedData,
        dueDate,
    });

    if (error) {
        throw error;
    }
    return formData;
}

const examFormSchema = z.object({
    course: z.string().min(1, "Course is required"),
    title: z.string().min(1, "Title is required"),
    examDate: z.string().min(1, "Due date is required"),
    notes: z.string().optional(),
});

export async function createExam(prevState: any, formData: FormData) {
    const parsedData = examFormSchema.parse({
        course: formData.get("course"),
        title: formData.get("title"),
        examDate: formData.get("examDate"),
        notes: formData.get("notes"),
    });

    const examDate = new Date(parsedData.examDate);

    const { error } = await supabase.from("exams").insert({
        ...parsedData,
        examDate,
    });
    revalidatePath("/exams");

    if (error) {
        throw error;
    }

    return formData;
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
