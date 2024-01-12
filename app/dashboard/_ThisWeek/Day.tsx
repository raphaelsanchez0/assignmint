"use client";
import Image from "next/image";
import { useState } from "react";
import iconArrow from "../../_assets/icons/arrow.svg";
import Assignment from "./Assignment";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getEventsOnDate } from "@/server/api";
import Exam from "@/app/_components/ExamsList/Exam";

interface DayProps {
  date: Date;
}

const Day: React.FC<DayProps> = ({ date }) => {
  const [expanded, setExpanded] = useState(false);

  const dayString = handleDayOfWeekString(date);

  const { data: exams, error: examsThisWeekError } = useQuery<Exam[]>({
    queryKey: [dayString, "thisWeek", "exams"],
    queryFn: () => getEventsOnDate("exams", date),
  });

  const { data: assignments, error: assignmentsThisWeekError } = useQuery<
    Exam[]
  >({
    queryKey: [dayString, "thisWeek", "assignments"],
    queryFn: () => getEventsOnDate("exams", date),
  });

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <hr className="h-px w-full bg-gray-400 border-0 my-4" />
      <div className="flex justify-between" onClick={handleClick}>
        <div>
          <h3 className="text-xl font-semibold text-off-black">{dayString}</h3>
          <h5 className="text-sm text-gray-500">5 Assignment due</h5>
        </div>
        <ExpandComponentToggleArrow expanded={expanded} />
      </div>
      {expanded && (
        <>
          <Assignment name="Assignment 1" course="Math" color="#F87171" />
          <Assignment name="Assignment 1" course="Math" color="#F87171" />
        </>
      )}
    </>
  );
};

export default Day;

function ExpandComponentToggleArrow({ expanded }: { expanded: boolean }) {
  return (
    <Image
      src={iconArrow}
      alt="arrow"
      width={50}
      className={`transition-transform duration-500 ease-in-out 
                ${expanded ? "transform rotate-180" : ""}`}
    />
  );
}

function handleDayOfWeekString(date: Date) {
  if (date.getDay() === new Date().getDay()) {
    return "Today";
  } else if (date.getDay() === new Date().getDay() + 1) {
    return "Tomorrow";
  } else {
    //Return the date in the format of "Monday"
    return format(date, "iiii");
  }
}
