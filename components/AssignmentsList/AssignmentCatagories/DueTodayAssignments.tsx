"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getDueTodayAssignments } from "@/server/apis/assignments";
import GenericAssignments from "./GenericAssignments";

export default function DueTodayAssignments() {
  return (
    <GenericAssignments
      fetchAssignmentsFn={getDueTodayAssignments}
      queryKey="dueTodayAssignments"
      color="#7DC672"
      title="Due Today"
    />
  );
}
