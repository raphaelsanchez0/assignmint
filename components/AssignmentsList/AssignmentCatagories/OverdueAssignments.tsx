"use client";
import { getOverdueAssignments } from "@/server/apis/assignments";
import GenericAssignments from "./GenericAssignments";
export default function OverdueAssignments() {
  return (
    <GenericAssignments
      fetchAssignmentsFn={getOverdueAssignments}
      queryKey="overDueAssignments"
      title="Overdue"
      color="#FC7C7C"
    />
  );
}
