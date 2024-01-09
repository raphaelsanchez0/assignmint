"use client";
import Link from "next/link";
import Exam from "./Exam";
import format from "date-fns/format";
import { getExams } from "@/app/_server/api";
import { useEffect, useState, useOptimistic } from "react";
import AddExamDialog from "@/app/dashboard/AddExamDialog";

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
    const getChanges = () => {
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
                        date={format(new Date(exam.examDate), "MMM d")}
                    />
                ))}
            </div>
            <AddExamDialog onData={getChanges} />
        </div>
    );
};

export default ExamsList;
