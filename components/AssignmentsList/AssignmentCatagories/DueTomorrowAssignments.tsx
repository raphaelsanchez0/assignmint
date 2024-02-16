"use client";

import { getDueTomorrowAssignments } from "@/server/apis/assignments";
import GenericAssignments from "./GenericAssignments";

export default function DueTomorrowAssignments() {
  return (
    <GenericAssignments
      fetchAssignmentsFn={getDueTomorrowAssignments}
      queryKey="getDueTomorrowAssignments"
      title="Due Tomorrow"
      color="#009FB7"
    />
  );
}
