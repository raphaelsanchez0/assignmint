"use client";
import { getNextWeekAssignments } from "@/server/apis/assignments";
import GenericAssignments from "./GenericAssignments";

export default function NextWeekAssignments() {
  return (
    <GenericAssignments
      fetchAssignmentsFn={getNextWeekAssignments}
      queryKey="nextWeekAssignments"
      title="Next Week"
      color="#A11692"
    />
  );
}
