"use server";

import { revalidatePath } from "next/cache";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/services/firebase";
import { z } from "zod";

const addAssignmentFormSchema = z.object({
    course: z.string().min(1, "Course is required"),
    title: z.string().min(1, "Title is required"),
    dueDate: z.string().min(1, "Due date is required"),
    notes: z.string().optional(),
});

export async function createAssignment(prevState: any, formData: FormData) {
    try {
        const parsedData = addAssignmentFormSchema.parse({
            course: formData.get("course"),
            title: formData.get("title"),
            dueDate: formData.get("dueDate"),
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

const examFormSchema = z.object({
    course: z.string().min(1, "Course is required"),
    title: z.string().min(1, "Title is required"),
    examDate: z.string().min(1, "Due date is required"),
    notes: z.string().optional(),
});

export async function createExam(prevState: any, formData: FormData) {
    try {
        const parsedData = examFormSchema.parse({
            course: formData.get("course"),
            title: formData.get("title"),
            examDate: formData.get("examDate"),
            notes: formData.get("notes"),
        });

        const examDate = new Date(parsedData.examDate);
        await addDoc(collection(db, "exams"), {
            ...parsedData,
            examDate,
        });
        revalidatePath("/dasboard");
        return formData;
    } catch (e) {
        console.log(e);
    }
}
