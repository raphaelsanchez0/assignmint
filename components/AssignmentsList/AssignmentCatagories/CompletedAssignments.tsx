"use client";
import { fetchAssignments } from "@/server/apis/assignments";
import GenericAssignments from "./GenericAssignments";
import React from "react";

export default function CompletedAssignments() {
  return (
    <GenericAssignments
      fetchAssignmentsFn={() =>
        fetchAssignments({ comparison: "eq", offsetDays: 0, isCompleted: true })
      }
      queryKey="completedAssignments"
      color="#A3A3A3"
      title="Completed"
    />
  );
}
