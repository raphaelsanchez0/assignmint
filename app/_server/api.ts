import {
    doc,
    setDoc,
    collection,
    getDocs,
    deleteDoc,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import supabase from "@/services/supabase";
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
    const courseRef = doc(db, "courses", courseID);
    await deleteDoc(courseRef);
}

export async function getExams() {
    const { data, error } = await supabase.from("exams").select();
    if (error) {
        console.error(error);
        throw error;
    }
    return data;
}
