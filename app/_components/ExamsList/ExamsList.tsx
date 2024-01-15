"use client";
import { getExams } from "@/server/apis/exams";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Exam from "./Exam";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import LoadingListShorter from "../Loading/LoadingListShorter";

export default function ExamsList() {
  const { data, error, isLoading } = useQuery<Exam[]>({
    queryKey: ["exams"],
    queryFn: getExams,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingListShorter />;

  if (data?.length === 0) {
    return null;
  }
  return (
    <div>
      {data?.map((exam) => (
        <Exam
          key={exam.id}
          name={exam.title}
          course={exam.course.title}
          color={exam.course.color}
          date={format(utcToZonedTime(exam.examDate, "Etc/UTC"), "MMM d")}
        />
      ))}
    </div>
  );
}
