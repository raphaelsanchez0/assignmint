"use client";
import { getFutureAssignments } from "@/server/apis/assignments";
import GenericAssignments from "./GenericAssignments";

export default function FutureAssignments() {
  return (
    <GenericAssignments
      fetchAssignmentsFn={getFutureAssignments}
      queryKey="futureAssignments"
      title="Coming Up"
      color="#737373"
    />
  );
}
