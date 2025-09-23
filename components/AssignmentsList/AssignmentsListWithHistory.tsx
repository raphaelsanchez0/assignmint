"use client";
import { Card } from "../ui/card";
import AddAssignmentDialog from "@/components/dialogs/assignments/AddAssignmentDialog";
import FutureAssignments from "./AssignmentCatagories/FutureAssignments";
import AssignmentCategories from "./AssignmentCatagories";
import { Tabs, TabsContent, TabsList } from "../ui/tabs";
import { TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import AssignmentHistory from "./AssignmentHistory";
import { Toggle } from "../ui/toggle";
import { History } from "lucide-react";

interface AssignmentsListProps {
  showAddAssignment?: boolean;
  cardTitle?: string;
  isInteractive?: boolean;
}

export default function AssignmentsListWithHistory({
  showAddAssignment = false,
  cardTitle = "Assignments",
  isInteractive = true,
}: AssignmentsListProps) {
  const [showHistory, setShowHistory] = useState(false);
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h3 className="card-title">{cardTitle}</h3>
        <div className="flex">
          {" "}
          <Toggle>
            <History />
          </Toggle>
          {showAddAssignment && (
            <div>
              <AddAssignmentDialog />
            </div>
          )}
        </div>
      </div>
      <AssignmentCategories isInteractive={isInteractive} />
      <AssignmentHistory />
    </Card>
  );
}
