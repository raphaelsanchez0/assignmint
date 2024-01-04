import Link from "next/link";
import Exam from "./Exam";
import FetchExams from "./FetchExams";

interface ExamsListProps {
    showAddExam?: boolean;
}

const ExamsList: React.FC<ExamsListProps> = ({ showAddExam = false }) => {
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
                <FetchExams />
            </div>
        </div>
    );
};

export default ExamsList;
