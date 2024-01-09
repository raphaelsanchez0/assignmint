"use client";
import Link from "next/link";
import Exam from "./Exam";
import format from "date-fns/format";
import { getExams } from "@/server/api";

import AddExamDialog from "@/app/dashboard/AddExamDialog";
import { utcToZonedTime } from "date-fns-tz";
import { useQuery } from "@tanstack/react-query";

interface ExamsListProps {
    showAddExam?: boolean;
}

//Tells nextjs to not rely on cache
export const revalidate = 0;

const ExamsList: React.FC<ExamsListProps> = ({ showAddExam = false }) => {
    const { data, error } = useQuery<Exam[]>({
        queryKey: ["exams"],
        queryFn: getExams,
    });
    if (error) return <div>An error has occured: {error.message}</div>;

    return (
        <div className="card">
            <div className="flex items-center justify-between mb-4">
                <h3 className="card-title">Exams</h3>
                {showAddExam && (
                    <Link href="/dashboard?addexam=y">
                        <button className="btn">Add</button>
                    </Link>
                )}
            </div>
            <div>
                {data?.map((exam) => (
                    <Exam
                        key={exam.id}
                        name={exam.title}
                        course={exam.course.title}
                        color={exam.course.color}
                        date={format(
                            utcToZonedTime(exam.examDate, "Etc/UTC"),
                            "MMM d",
                        )}
                    />
                ))}
            </div>
            <AddExamDialog />
        </div>
    );
};

export default ExamsList;
