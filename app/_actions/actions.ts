"use server";

import { revalidatePath } from "next/cache";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/services/firebase";

export async function createAssignment(prevState: any, formData: FormData) {
    try {
        await addDoc(collection(db, "assignments"), {
            course: formData.get("course"),
            title: formData.get("title"),
            dueDate: formData.get("due-date"),
            notes: formData.get("notes"),
        });
    } catch (e) {
        console.log(e);
    }
}
