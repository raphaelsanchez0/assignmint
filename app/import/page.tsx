"use client";
import AssignmentsList from "@/components/AssignmentsList/AssignmentsList";
import AssignmentsFromCanvas from "./AssignmentsFromCanvas";
import { ImportAssignmentsContextProvider } from "./ImportAssignmentsContext";
import { Suspense } from "react";
import ImportFromCanvas from "./ImportFromCanvas";

export default function ImportAssignments() {
  return (
    <div className="">
      <h2 className="text-2xl text-center  font-extrabold p-4">
        Import Assignments
      </h2>
      <div className="flex gap-3">
        <div className="basis-1/2">
          <ImportFromCanvas />
        </div>
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
