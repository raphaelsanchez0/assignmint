"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import AddAssignmentDialog from "@/components/dialogs/assignments/AddAssignmentDialog";
import AssignmentCategories from "../AssignmentCatagories";
import { Toggle } from "@/components/ui/toggle";
import { History, HistoryIcon } from "lucide-react";

interface AssignmentsListWithHistoryProps {
  cardTitle?: string;
}
export default function AssignmentListWithHistory({
  cardTitle = "Assignments",
}: AssignmentsListWithHistoryProps) {
  const isInteractive = true;
  const [showHistory, setShowHistory] = useState(false);
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
            onPressedChange={setShowHistory}
          >
            <History />
          </Toggle>
          <AddAssignmentDialog />
        </div>
      </div>
      <AssignmentCategories isInteractive={isInteractive} />
    </Card>
  );
}
