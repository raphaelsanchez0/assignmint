"use client";
import { parseAssignments } from "@/utils/parseImport";
import { useSearchParams } from "next/navigation";
import Assignment from "./Assignment";
import Date from "./Date";
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "@/server/apis/courses";
import { Card, CardTitle } from "@/components/ui/card";
import AssignmentsList from "@/components/AssignmentsList/AssignmentsList";
import AssignmentsFromCanvas from "./AssignmentsFromCanvas";

export default function ImportAssignments() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("assignments");
  let assignments: { [date: string]: string[] };
  assignments = parseAssignments(searchQuery!);

  return (
    <div className="">
      <h2 className="text-2xl text-center  font-extrabold p-4">
        Import Assignments
      </h2>
      <div className="flex gap-3">
        <AssignmentsFromCanvas assignments={assignments} />
        <div className="basis-1/2">
          <AssignmentsList
            cardTitle="Existing Assignments"
            isInteractive={false}
          />
        </div>
      </div>
    </div>
  );
}
