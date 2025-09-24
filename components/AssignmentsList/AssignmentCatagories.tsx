"use client";
import { useQuery } from "@tanstack/react-query";
import DueTodayAssignments from "./AssignmentCatagories/DueTodayAssignments";
import DueTomorrowAssignments from "./AssignmentCatagories/DueTomorrowAssignments";
import FutureAssignments from "./AssignmentCatagories/FutureAssignments";
import NextWeekAssignments from "./AssignmentCatagories/NextWeekAssignments";
import OverdueAssignments from "./AssignmentCatagories/OverdueAssignments";
import PriorityAssignments from "./AssignmentCatagories/PriorityAssignments";
import ThisWeekAssignments from "./AssignmentCatagories/ThisWeekAssignments";
import { hasActiveAssignments } from "@/server/apis/assignments";
import { createContext, useContext } from "react";

interface AssignmentCategoriesProps {
  isInteractive?: boolean;
}

export const IsInteractiveContext = createContext<boolean>(true);

export default function AssignmentCategories({
  isInteractive = true,
}: AssignmentCategoriesProps) {
  const { data: assignmentsExist } = useQuery<boolean>({
    queryKey: ["assignments"],
    queryFn: () => hasActiveAssignments(),
  });

  if (!assignmentsExist) {
    return (
      <p className="text-gray-500 dark:text-gray-600 text-sm italic text-center pt-4">
        No Assignments Due
      </p>
    );
  }

  return (
    <IsInteractiveContext.Provider value={isInteractive}>
      <ol>
        <OverdueAssignments />
        <PriorityAssignments />
        <DueTodayAssignments />
        <DueTomorrowAssignments />
        <ThisWeekAssignments />
        <NextWeekAssignments />
        <FutureAssignments />
      </ol>
    </IsInteractiveContext.Provider>
  );
}
