import { getDocs, doc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/services/firebase";
import format from "date-fns/format";
import Exam from "./Exam";

interface Exam {
    id: string;
    title: string;
    course: Course;
    examDate: Timestamp;
}

async function getExams() {
    const examsRef = collection(db, "exams");
    let exams: Exam[] = [];
    const snapshot = await getDocs(examsRef);
    snapshot.docs.forEach((doc) => {
        exams.push({ ...doc.data(), id: doc.id } as Exam);
    });

    return exams;
}

export default async function FetchExams() {
    const exams = await getExams();
    return (
        <>
            {exams.map((exam) => (
                <Exam
                    key={exam.id}
                    name={exam.title}
                    course={exam.course.title}
                    date={
                        exam.examDate
                            ? format(exam.examDate.toDate(), "MMM dd")
                            : ""
                    }
                    color={exam.course.color}
                />
            ))}
        </>
    );
}
