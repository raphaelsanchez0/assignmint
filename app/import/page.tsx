"use client";
import { parseAssignments } from "@/utils/parseImport";
import { useSearchParams } from "next/navigation";
import Assignment from "./Assignment";
import Date from "./Date";
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "@/server/apis/courses";
import { Card, CardTitle } from "@/components/ui/card";
import AssignmentsList from "@/components/AssignmentsList/AssignmentsList";

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
        <Card className="basis-1/2 sm:p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="card-title">Assignments From Canvas</h3>
            <button className="btn">Add</button>
          </div>
          {assignments &&
            Object.entries(assignments).map(([date, assignments], index) => (
              <Date key={index} date={date} assignments={assignments} />
            ))}
        </Card>
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
