"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import AddAssignmentDialog from "@/components/dialogs/assignments/AddAssignmentDialog";
import AssignmentCategories from "../AssignmentCatagories";
import { Toggle } from "@/components/ui/toggle";
import { History, HistoryIcon } from "lucide-react";
import CompletedAssignments from "../AssignmentCatagories/CompletedAssignments";
import { useQueryClient } from "@tanstack/react-query";

interface AssignmentsListWithHistoryProps {
  cardTitle?: string;
}
export default function AssignmentListWithHistory({
  cardTitle = "Assignments",
}: AssignmentsListWithHistoryProps) {
  const queryClient = useQueryClient();
  const isInteractive = true;
  const [showHistory, setShowHistory] = useState(false);
  function handleShowHistoryChange(value: boolean) {
    setShowHistory(value);
    queryClient.invalidateQueries({ queryKey: ["assignments"] });
  }
  return (
    <Card>
      <div className="flex items-center justify-between">
        {showHistory ? (
          <h3 className="card-title">{"Completed Today"}</h3>
        ) : (
          <h3 className="card-title">{cardTitle}</h3>
        )}
        <div>
          <Toggle
            className="mr-2"
            pressed={showHistory}
            onPressedChange={handleShowHistoryChange}
          >
            <History />
          </Toggle>
          <AddAssignmentDialog />
        </div>
      </div>
      {showHistory ? (
        <CompletedAssignments />
      ) : (
        <AssignmentCategories isInteractive={isInteractive} />
      )}
    </Card>
  );
}
