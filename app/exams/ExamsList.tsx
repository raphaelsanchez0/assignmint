"use client";
import Link from "next/link";
import Exam from "../../components/ExamsList/Exam";
import format from "date-fns/format";
import { getExams } from "@/server/apis/exams";

import { utcToZonedTime } from "date-fns-tz";
import { useQuery } from "@tanstack/react-query";
import LoadingListShorter from "../../components/Loading/LoadingListShorter";
import { Card } from "@/components/ui/card";

interface ExamsListProps {
  showAddExam?: boolean;
}

//Tells nextjs to not rely on cache
export const revalidate = 0;

const ExamsList: React.FC<ExamsListProps> = ({ showAddExam = false }) => {
  const { data, error, isLoading } = useQuery<Exam[]>({
    queryKey: ["exams"],
    queryFn: getExams,
  });

  if (isLoading) return <LoadingListShorter />;
  if (error) return <div>An error has occured: {error.message}</div>;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="card-title">Exams</h3>
        {showAddExam && <button className="btn">Add</button>}
      </div>
      <div>{data?.map((exam) => <Exam key={exam.id} exam={exam} />)}</div>
    </Card>
  );
};

export default ExamsList;
