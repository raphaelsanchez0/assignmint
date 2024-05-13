"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import utcToZonedTime from "date-fns-tz/utcToZonedTime";

interface ViewExamDialogProps {
  exam: Exam;
  swapDialogFn: (to: "edit" | "view") => void;
  handleDeleteExam: () => void;
}

import React from "react";

export default function ViewExamDialog({
  exam,
  swapDialogFn,
  handleDeleteExam,
}: ViewExamDialogProps) {
  const labelStyle = "font-light";
  const pStyle = "text-lg font-medium";

  function handleEditExam() {
    swapDialogFn("edit");
  }

  return (
    <DialogContent className="lg:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>View Exam</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-2 grid-rows-2 items-center gap-4">
        <div>
          <Label className={labelStyle}>Course</Label>
          <p className={pStyle}>{exam.course.title}</p>
        </div>

        <div>
          <Label className={labelStyle}>Title</Label>
          <p className={pStyle}>{exam.title}</p>
        </div>

        <div>
          <Label className={labelStyle}>Due</Label>
          <p className={pStyle}>
            {format(utcToZonedTime(exam.examDate, "Etc/UTC"), "MMM d")}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="btn mt-4" onClick={handleEditExam}>
          Edit
        </button>
        <button className="btn mt-4 ml-4" onClick={handleDeleteExam}>
          Complete
        </button>
      </div>
    </DialogContent>
  );
}
