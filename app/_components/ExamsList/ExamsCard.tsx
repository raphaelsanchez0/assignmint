import Link from "next/link";
import Exam from "./Exam";
import format from "date-fns/format";
import { getExams } from "@/server/api";

import AddExamDialog from "@/app/dashboard/AddExamDialog";
import { utcToZonedTime } from "date-fns-tz";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  useQuery,
} from "@tanstack/react-query";
import ExamsList from "./ExamsList";

interface ExamsListProps {
  showAddExam?: boolean;
}

//Tells nextjs to not rely on cache

const ExamsCard: React.FC<ExamsListProps> = async ({ showAddExam = false }) => {
  const queryClient = new QueryClient();

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
        <ExamsList />
      </div>
      <AddExamDialog />
    </div>
  );
};

export default ExamsCard;
