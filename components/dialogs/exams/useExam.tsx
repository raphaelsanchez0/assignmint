import { getExam } from "@/server/apis/exams";
import { useQuery } from "@tanstack/react-query";

export default function useExam(examID: string) {
  const {
    data: exam,
    error: examError,
    isLoading: examLoading,
  } = useQuery<Exam>({
    queryKey: ["exam", examID],
    queryFn: () => getExam(examID),
  });

  return { exam, examError, examLoading };
}
