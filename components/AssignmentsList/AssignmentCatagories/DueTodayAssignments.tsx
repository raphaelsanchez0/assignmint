"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getDueTodayAssignments } from "@/server/apis/assignments";
import Assignment from "../Assignment";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import SectionDivider from "./SectionDivider";
import LoadingSkeleton from "../../Loading/LoadingListShorter";
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
