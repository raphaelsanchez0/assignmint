import Link from "next/link";

import { utcToZonedTime } from "date-fns-tz";
import { QueryClient } from "@tanstack/react-query";
import ExamsList from "./ExamsList";
import { Card } from "../ui/card";
import AddExamDialog from "../dialogs/exams/AddExamDialog";

interface ExamsListProps {
  showAddExam?: boolean;
}

//Tells nextjs to not rely on cache

const ExamsCard: React.FC<ExamsListProps> = async ({ showAddExam = false }) => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="card-title">Exams</h3>
        {showAddExam && <AddExamDialog />}
      </div>
      <div>
        <ExamsList />
      </div>
    </Card>
  );
};

export default ExamsCard;
