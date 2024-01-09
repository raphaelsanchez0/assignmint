"use client";
import Link from "next/link";
import Exam from "../_components/ExamsList/Exam";
import format from "date-fns/format";
import { getExams } from "@/server/actions";
import { useEffect, useState, useOptimistic } from "react";
import AddExamDialog from "@/app/dashboard/AddExamDialog";
import { utcToZonedTime } from "date-fns-tz";

interface ExamsListProps {
    showAddExam?: boolean;
    initialExams: Exam[];
}

//Tells nextjs to not rely on cache
export const revalidate = 0;

const ExamsList: React.FC<ExamsListProps> = ({
    showAddExam = false,
    initialExams,
}) => {
    const [exams, setExams] = useState<Exam[]>(initialExams);
    const updateExams = () => {
        const fetchExams = async () => {
            const examsFromServer = await getExams();
            setExams((prev) => [...prev, ...examsFromServer]);
        };
        fetchExams();
    };
    useEffect(() => {
        const fetchExams = async () => {
            const examsFromServer = await getExams();
            setExams(examsFromServer);
        };
        fetchExams();
    }, []);
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
                {exams.map((exam) => (
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
            <AddExamDialog onSubmission={updateExams} />
        </div>
    );
};

export default ExamsList;
