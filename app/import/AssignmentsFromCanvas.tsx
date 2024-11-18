import { Card } from "@/components/ui/card";
import React from "react";
import Date from "./Date";

interface AssignmentFromCanvasProps {
  assignments: { [date: string]: string[] };
}

export default function AssignmentsFromCanvas({
  assignments,
}: AssignmentFromCanvasProps) {
  return (
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
  );
}
