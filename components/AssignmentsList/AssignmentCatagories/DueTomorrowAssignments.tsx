"use client";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { getDueTomorrowAssignments } from "@/server/apis/assignments";
import Assignment from "../Assignment";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import SectionDivider from "./SectionDivider";
import LoadingSkeleton from "../../Loading/LoadingListShorter";

export default function DueTomorrowAssignments() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["getDueTomorrowAssignments"],
    queryFn: getDueTomorrowAssignments,
  });

  if (isLoading) return <LoadingSkeleton />;

  if (error) return <p>error</p>;

  if (data?.length === 0) {
    return null;
  }

  return (
    <>
      <SectionDivider title="Due Tomorrow" color="#009FB7" />
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
