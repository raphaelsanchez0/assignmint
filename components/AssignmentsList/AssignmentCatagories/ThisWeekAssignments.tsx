"use client";
import React, { Suspense } from "react";
import {
  fetchAssignments,
  getThisWeekAssignments,
} from "@/server/apis/assignments";
import GenericAssignments from "./GenericAssignments";

export default function ThisWeekAssignments() {
  return (
    <GenericAssignments
      fetchAssignmentsFn={getThisWeekAssignments}
      queryKey="thisWeekAssignments"
      title="This Week"
      color="#6366f1"
    />
  );
}
