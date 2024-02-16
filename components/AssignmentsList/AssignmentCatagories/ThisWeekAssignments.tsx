"use client";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { getThisWeekAssignments } from "@/server/apis/assignments";
import GenericAssignments from "./GenericAssignments";

export default function ThisWeekAssignments() {
  return (
    <GenericAssignments
      fetchAssignmentsFn={getThisWeekAssignments}
      queryKey="thisWeekAssignments"
      title="This Week"
      color="#A11692"
    />
  );
}
