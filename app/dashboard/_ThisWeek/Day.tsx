"use client";
import Image from "next/image";
import { useState } from "react";
import iconArrow from "@/public/icons/arrow.svg";

import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getEventsOnDate } from "@/server/apis/api";
import Exam from "@/components/ExamsList/Exam";
import LoadingItem from "@/components/Loading/LoadingItem";
import ExpandedDay from "./ExpandedDay";
import { ChevronDown } from "lucide-react";

interface DayProps {
  date: Date;
}

const Day: React.FC<DayProps> = ({ date }) => {
  const [expanded, setExpanded] = useState(false);
  const dayString = handleDayOfWeekString(date);

  const {
    data: exams,
    error: examsThisWeekError,
    isLoading: ExamsIsLoading,
  } = useQuery<Exam[]>({
    queryKey: ["exams", "thisWeek", dayString],
    queryFn: () => getEventsOnDate("exams", date),
  });

  const {
    data: assignments,
    error: assignmentsThisWeekError,
    isLoading: assignmentsIsLoading,
  } = useQuery({
    queryKey: ["assignments", "thisWeek", dayString],
    queryFn: () => getEventsOnDate("assignments", date),
  });

  const handleClick = () => {
    setExpanded(!expanded);
  };

  let subtitle = "";
  if (exams && assignments) {
    subtitle = createDaySubheader(exams.length, assignments.length);
  }

  const showArrow =
    (exams && exams.length > 0) || (assignments && assignments.length > 0);

  return (
    <>
      <hr className="h-px w-full bg-gray-400 border-0 my-4" />
      <div className="flex justify-between items-center" onClick={handleClick}>
        <div>
          <h3 className="text-xl font-semibold text-off-black">{dayString}</h3>
          <h5 className="text-sm text-gray-500 dark:text-gray-400">
            {subtitle}
          </h5>
        </div>
        {showArrow ? <ExpandComponentToggleArrow expanded={expanded} /> : <></>}
      </div>
      {expanded && (
        <ExpandedDay exams={exams || []} assignments={assignments || []} />
      )}
    </>
  );
};

export default Day;

function ExpandComponentToggleArrow({ expanded }: { expanded: boolean }) {
  return (
    <ChevronDown
      size={24}
      className={`transition-transform duration-500 ease-in-out 
                ${expanded ? "transform rotate-180" : ""}`}
    />
  );
}

function handleDayOfWeekString(date: Date) {
  debugger;
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const isTomorrow = date.toDateString() === tomorrow.toDateString();

  if (isToday) {
    return "Today";
  } else if (isTomorrow) {
    return "Tomorrow";
  }
  return format(date, "iiii");
}
/**
 * Creates a string that represents how many exams and assignments are due
 * on the given day.
 *
 * Example: 1 Exam, 2 Assignments => 1 Exam, 2 Assignments
 * Example: 0 Exams, 2 Assignments => 2 Assignments
 * Example: 1 Exam, 0 Assignments => 1 Exam
 * Example: 0 Exams, 0 Assignments => "Nothing due"
 *
 * @param numberOfExams
 * @param numberOfAssignments
 */
function createDaySubheader(
  numberOfExams: number,
  numberOfAssignments: number,
) {
  let subheader = "";
  if (numberOfExams > 0) {
    subheader += `${numberOfExams} Exam`;
    if (numberOfExams > 1) {
      subheader += "s";
    }
  }
  if (numberOfAssignments > 0) {
    if (numberOfExams > 0) {
      subheader += ", ";
    }
    subheader += `${numberOfAssignments} Assignment`;
    if (numberOfAssignments > 1) {
      subheader += "s";
    }
  }
  if (numberOfExams === 0 && numberOfAssignments === 0) {
    subheader = "Nothing due";
  }
  return subheader;
}
