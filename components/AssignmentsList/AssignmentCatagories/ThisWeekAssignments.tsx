"use client";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import {
  fetchAssignments,
  getThisWeekAssignments,
} from "@/server/apis/assignments";
import GenericAssignments from "./GenericAssignments";

export default function ThisWeekAssignments() {
  return (
    <GenericAssignments
      fetchAssignmentsFn={() =>
        fetchAssignments({ comparison: "lt", offsetDays: 1, daysRange: 6 })
      }
      queryKey="thisWeekAssignments"
      title="This Week"
      color="#A11692"
    />
  );
}
