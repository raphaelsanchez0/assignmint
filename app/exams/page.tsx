import ExamsList from "../_components/ExamsList/ExamsList";
import AddExam from "./AddExam";
import { getExams, getCourses } from "@/app/_server/actions";

export default async function Exams() {
    const initialExams = await getExams();
    const coursesFromServer = await getCourses();
    const formattedCourses = coursesFromServer.map((course) => ({
        label: course.title,
        value: course.id,
    }));
    return (
        <div className="ml-sidebar-width">
            <div className="flex gap-4 p-4">
                <div className="basis-1/2 ">
                    <ExamsList initialExams={initialExams} />
                </div>
                <div className="basis-1/2">
                    <AddExam courses={formattedCourses} />
                </div>
            </div>
        </div>
    );
}
