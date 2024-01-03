import { getDocs, doc, collection } from "firebase/firestore";
import { db } from "@/services/firebase";
import Assignment from "./Assignment";
import format from "date-fns/format";

async function getAssignments() {
    const assignmentsRef = collection(db, "assignments");
    let assignments: Assignment[] = [];
    getDocs(assignmentsRef).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            assignments.push({ ...doc.data(), id: doc.id } as Assignment);
        });
    });
    return assignments;
}

export default async function FetchAssignments() {
    const assignments = await getAssignments();
    return (
        <>
            {assignments.map((assignment) => (
                <Assignment
                    key={assignment.id}
                    title={assignment.title}
                    course={assignment.course.title}
                    due={
                        assignment.dueDate
                            ? format(assignment.dueDate, "MMM, dd")
                            : ""
                    }
                    color={assignment.course.color}
                />
            ))}
        </>
    );
}
