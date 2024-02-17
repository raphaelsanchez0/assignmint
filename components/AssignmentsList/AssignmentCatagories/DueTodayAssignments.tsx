"use client";

import { fetchAssignments } from "@/server/apis/assignments";
import React from "react";
import GenericAssignments from "./GenericAssignments";

export default function DueTodayAssignments() {
  return (
    <GenericAssignments
      fetchAssignmentsFn={() =>
        fetchAssignments({ comparison: "eq", offsetDays: 0 })
      }
      queryKey="dueTodayAssignments"
      color="#7DC672"
      title="Due Today"
    />
  );
}
