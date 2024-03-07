"use client";
import React from "react";
import { getPriorityAssignments } from "@/server/apis/assignments";

import GenericAssignments from "./GenericAssignments";
export default function PriorityAssignments() {
  return (
    <GenericAssignments
      fetchAssignmentsFn={getPriorityAssignments}
      queryKey="priorityAssignments"
      title="Priority"
      color="#F4BD6B"
    />
  );
}
