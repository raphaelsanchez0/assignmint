"use client";
import { useQuery } from "@tanstack/react-query";
import DueTodayAssignments from "./AssignmentCatagories/DueTodayAssignments";
import DueTomorrowAssignments from "./AssignmentCatagories/DueTomorrowAssignments";
import FutureAssignments from "./AssignmentCatagories/FutureAssignments";
import NextWeekAssignments from "./AssignmentCatagories/NextWeekAssignments";
import OverdueAssignments from "./AssignmentCatagories/OverdueAssignments";
import PriorityAssignments from "./AssignmentCatagories/PriorityAssignments";
import ThisWeekAssignments from "./AssignmentCatagories/ThisWeekAssignments";
import { hasAssignments } from "@/server/apis/assignments";

export default function AssignmentCatagories() {
  const { data: assignmentsExist } = useQuery<boolean>({
    queryKey: ["hasAssignments"],
    queryFn: () => hasAssignments(),
  });
  if (!assignmentsExist) {
    return (
      <p className="text-gray-500 dark:text-gray-600 text-sm italic text-center pt-4">
        No Assignments Due
      </p>
    );
  }
  return (
    <ol>
      <OverdueAssignments />
      <PriorityAssignments />
      <DueTodayAssignments />
      <DueTomorrowAssignments />
      <ThisWeekAssignments />
      <NextWeekAssignments />
      <FutureAssignments />
    </ol>
  );
}
