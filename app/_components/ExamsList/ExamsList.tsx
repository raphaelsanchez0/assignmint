"use client";
import Link from "next/link";
import Exam from "./Exam";
import format from "date-fns/format";
import { getExams } from "@/app/_server/api";
import { useEffect, useState } from "react";
import AddExamDialog from "@/app/dashboard/AddExamDialog";

interface ExamsListProps {
    showAddExam?: boolean;
}

const ExamsList: React.FC<ExamsListProps> = ({ showAddExam = false }) => {
    const [exams, setExams] = useState<Exam[]>([]);
    const getChanges = () => {
        const fetchExams = async () => {
            const examsFromServer = await getExams();
            setExams(examsFromServer);
        };
        fetchExams();
    };
    useEffect(() => {
        const fetchExams = async () => {
            const examsFromServer = await getExams();
            setExams(examsFromServer);
        };
        fetchExams();
    });
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
                        date={
                            exam.examDate
                                ? format(exam.examDate.toDate(), "MMM dd")
                                : ""
                        }
                        color={exam.course.color}
                    />
                ))}
            </div>
            <AddExamDialog onData={getChanges} />
        </div>
    );
};

export default ExamsList;
