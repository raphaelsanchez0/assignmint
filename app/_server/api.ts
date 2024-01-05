import {
    doc,
    setDoc,
    collection,
    getDocs,
    deleteDoc,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import { z } from "zod";

const addCouseSchema = z.object({
    id: z.string().min(1, "Course is required"),
    title: z.string().min(1, "Course is required"),
    color: z.string().min(1, "Color is required"),
});

export async function createOrUpdateCourse(
    courseID: string,
    courseName: string,
    courseColor: string,
) {
    try {
        const validatedCourse = addCouseSchema.parse({
            id: courseID,
            title: courseName,
            color: courseColor,
        });

        // Get a reference to the document
        const courseRef = doc(db, "courses", validatedCourse.id);

        // Set the document data
        await setDoc(courseRef, validatedCourse, { merge: true });
    } catch (e) {
        console.log(e);
    }
}
export async function getCourses() {
    const courseCollection = collection(db, "courses");
    const courseSnapshot = await getDocs(courseCollection);
    const courseList: Course[] = courseSnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        color: doc.data().color,
        // include other properties here if your Course type has more
    }));
    return courseList;
}

export async function deleteCourse(courseID: string) {
    const courseRef = doc(db, "courses", courseID);
    await deleteDoc(courseRef);
}

export async function getExams() {
    const examsRef = collection(db, "exams");
    let exams: Exam[] = [];
    const snapshot = await getDocs(examsRef);
    snapshot.docs.forEach((doc) => {
        exams.push({ ...doc.data(), id: doc.id } as Exam);
    });

    return exams;
}
