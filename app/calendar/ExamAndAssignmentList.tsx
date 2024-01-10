"use client";
import { useSearchParams } from "next/navigation";
import { isToday, isTomorrow, isYesterday, format } from "date-fns";
import { getEventsOnDate } from "@/server/api";
import { useQuery } from "@tanstack/react-query";
import Exam from "../_components/ExamsList/Exam";
import { utcToZonedTime } from "date-fns-tz";
import Assignment from "../_components/AssignmentsList/Assignment";
import SectionDivider from "../_components/AssignmentsList/AssignmentCatagories/SectionDivider";

export default function ExamAndAssignmentList() {
  const searchParams = useSearchParams();

  let selectedDateString = searchParams.get("date");
  let selectedDate = selectedDateString
    ? new Date(`${selectedDateString}T00:00`)
    : new Date();
  let formatedDate = formatDate(selectedDate);

  const { data: exams, error: examsTodayError } = useQuery<Exam[]>({
    queryKey: ["examsToday", formatedDate],
    queryFn: () => getEventsOnDate("exams", selectedDate),
  });

  const { data: assignments, error: assignmentsTodayError } = useQuery<
    Assignment[]
  >({
    queryKey: ["assignmentsToday", formatedDate],
    queryFn: () => getEventsOnDate("assignments", selectedDate),
  });

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h3 className="card-title mb-2">{formatedDate}</h3>
      </div>
      <h4 className="font-semibold my-1 text-xl">Exams</h4>
      <ol>
        {exams?.map((exam) => (
          <Exam
            key={exam.id}
            name={exam.title}
            course={exam.course.title}
            color={exam.course.color}
          />
        ))}
      </ol>
      <h4 className="font-semibold my-1 text-xl">Assignments</h4>
      <ol>
        {assignments?.map((assignment) => (
          <Assignment
            key={assignment.id}
            title={assignment.title}
            course={assignment.course.title}
            color={assignment.course.color}
          />
        ))}
      </ol>
    </div>
  );
}

function formatDate(selectedDate: Date): string {
  if (isToday(selectedDate)) {
    return "Today";
  } else if (isTomorrow(selectedDate)) {
    return "Tomorrow";
  } else if (isYesterday(selectedDate)) {
    return "Yesterday";
  } else {
    return format(selectedDate, "MMMM d, yyyy");
  }
}
