"use server";

import { revalidatePath } from "next/cache";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/services/firebase";
import { z } from "zod";

const assignmentFormSchema = z.object({
    course: z.string().min(1, "Course is required"),
    title: z.string().min(1, "Title is required"),
    dueDate: z.string().min(1, "Due date is required"),
    notes: z.string().optional(),
});

export async function createAssignment(prevState: any, formData: FormData) {
    try {
        const parsedData = assignmentFormSchema.parse({
            course: formData.get("course"),
            title: formData.get("title"),
            dueDate: formData.get("due-date"),
            notes: formData.get("notes"),
        });

        const dueDate = new Date(parsedData.dueDate);
        await addDoc(collection(db, "assignments"), {
            ...parsedData,
            dueDate,
        });
    } catch (e) {
        console.log(e);
    }
}
