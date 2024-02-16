"use client";
import { fetchAssignments } from "@/server/apis/assignments";
import GenericAssignments from "./GenericAssignments";
export default function OverdueAssignments() {
  return (
    <GenericAssignments
      fetchAssignmentsFn={() =>
        fetchAssignments({ comparison: "lt", daysOffset: 0 })
      }
      queryKey="overDueAssignments"
      title="Overdue"
      color="#FC7C7C"
    />
  );
}
