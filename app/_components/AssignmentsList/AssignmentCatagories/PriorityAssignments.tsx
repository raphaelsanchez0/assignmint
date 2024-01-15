"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPriorityAssignments } from "@/server/apis/assignments";
import Assignment from "../Assignment";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import SectionDivider from "./SectionDivider";
import LoadingSkeleton from "../../Loading/LoadingListShorter";

export default function PriorityAssignments() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["priorityAssignments"],
    queryFn: getPriorityAssignments,
  });

  if (isLoading) return <LoadingSkeleton />;
  if (data?.length === 0) {
    return null;
  }
  return (
    <>
      <SectionDivider title="Priority" color="#F4BD6B" />
      {data?.map((assignment) => (
        <Assignment
          key={assignment.id}
          id={assignment.id}
          title={assignment.title}
          course={assignment.course.title}
          due={format(utcToZonedTime(assignment.dueDate, "Etc/UTC"), "MMM d")}
          color={assignment.course.color}
        />
      ))}
    </>
  );
}
