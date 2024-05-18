import React from "react";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface ErrorDialogContentProps {
  title: string;
  type: "assignment" | "exam";
}

export default function ErrorDialogContent({
  title,
  type,
}: ErrorDialogContentProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <p className="text-lg font-medium text-center">
        {type === "assignment"
          ? "An error occurred while fetching the assignment."
          : "An error occurred while fetching the exam."}
      </p>
    </DialogContent>
  );
}
