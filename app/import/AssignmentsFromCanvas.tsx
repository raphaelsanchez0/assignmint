"use client";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import Date from "./Date";
import ImportAssignments from "./page";
import { useAssignmentsContext } from "./ImportAssignmentsContext";
import { importAssignmentsToPlanner } from "@/server/apis/assignments";
import { areAssignmentsValid } from "@/utils/areAssignmentsValid";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface AssignmentFromCanvasProps {
  assignments: CanvasAssignmentsByDate;
}

export default function AssignmentsFromCanvas({
  assignments,
}: AssignmentFromCanvasProps) {
  const { toast } = useToast();
  const router = useRouter();

  const { importAssignments } = useAssignmentsContext();

  const handleImportAssignments = async () => {
    const assignmentsValid = areAssignmentsValid(importAssignments);
    if (assignmentsValid) {
      importAssignmentsToPlanner(importAssignments);
      router.push("/dashboard");
    } else {
      toast({
        title: "Error",
        description:
          "Select at least one assignment and ensure they each have a course selected",
      });
    }
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
