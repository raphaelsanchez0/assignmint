"use client";
import {
  fetchAssignmentsCompletedToday,
  hasActiveAssignments,
} from "@/server/apis/assignments";
import GenericAssignments from "./GenericAssignments";
import React from "react";
import { useQuery } from "@tanstack/react-query";

export default function CompletedAssignments() {
  const { data: assignmentsExist } = useQuery<boolean>({
    queryKey: ["assignments"],
    queryFn: () => hasActiveAssignments(),
  });

  return (
    <div className="pt-4">
      <GenericAssignments
        fetchAssignmentsFn={() => fetchAssignmentsCompletedToday(new Date())}
        queryKey="completedAssignments"
        color="#A3A3A3"
        title="Completed"
        displayHeader={false}
        noAssignmentsText="Nothing done today, get to work!"
      />
    </div>
  );
}
