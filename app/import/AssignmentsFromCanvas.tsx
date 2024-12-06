"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import Date from "./Date";
import ImportAssignments from "./page";
import { useAssignmentsContext } from "./ImportAssignmentsContext";
import { importAssignmentsToPlanner } from "@/server/apis/assignments";
import { areAssignmentsValid } from "@/utils/areAssignmentsValid";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { parseAssignments } from "@/utils/parseImport";

export default function AssignmentsFromCanvas() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { importAssignments } = useAssignmentsContext();

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("assignments");
  let assignments: CanvasAssignmentsByDate;
  assignments = parseAssignments(searchQuery!);

  const handleImportAssignments = async () => {
    const assignmentsValid = areAssignmentsValid(importAssignments);
    if (assignmentsValid) {
      importAssignmentsToPlanner(importAssignments);
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      router.push("/dashboard");
      router.refresh();
    } else {
      toast({
        title: "Error",
        description:
          "Select at least one assignment and ensure they each have a course selected",
      });
    }
  };

  if (!searchQuery) {
    return (
      <Card className="basis-1/2 sm:p-4 md:p-6 flex flex-col gap-2">
        <CardTitle>Error: Missing Required Parameters</CardTitle>

        <CardDescription>
          It looks like you have manually attempted to access this page without
          using the extension. Please use the extension to import assignments.
        </CardDescription>
      </Card>
    );
  }

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
