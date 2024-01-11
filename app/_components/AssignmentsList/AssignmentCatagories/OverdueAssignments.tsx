"use client";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { getOverdueAssignments } from "@/server/api";
import Assignment from "../Assignment";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import SectionDivider from "./SectionDivider";
import LoadingSkeleton from "../../Loading/LoadingListShorter";

export default function OverdueAssignments() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["overDueAssignments"],
    queryFn: getOverdueAssignments,
  });

  if (isLoading) return <LoadingSkeleton />;

  if (data?.length === 0) {
    return null;
  }

  return (
    <>
      <SectionDivider title="Overdue" color="#FC7C7C" />
      {data?.map((assignment) => (
        <Assignment
          key={assignment.id}
          title={assignment.title}
          course={assignment.course.title}
          due={format(utcToZonedTime(assignment.dueDate, "Etc/UTC"), "MMM d")}
          color={assignment.course.color}
        />
      ))}
    </>
  );
}
