import { Card } from "@/components/ui/card";
import React from "react";
import Date from "./Date";
import ImportAssignments from "./page";
import { useAssignmentsContext } from "./ImportAssignmentsContext";
import { importAssignmentsToPlanner } from "@/server/apis/assignments";

interface AssignmentFromCanvasProps {
  assignments: CanvasAssignmentsByDate;
}

export default function AssignmentsFromCanvas({
  assignments,
}: AssignmentFromCanvasProps) {
  const { importAssignments } = useAssignmentsContext();

  const handleImportAssignments = () => {
    console.log(importAssignments);
    //importAssignmentsToPlanner(importAssignments)
  };

  return (
    <Card className="basis-1/2 sm:p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="card-title">Assignments From Canvas</h3>
        <button className="btn" onClick={handleImportAssignments}>
          Add
        </button>
      </div>
      {assignments &&
        Object.entries(assignments).map(([date, assignments], index) => (
          <Date key={index} date={date} assignments={assignments} />
        ))}
    </Card>
  );
}
