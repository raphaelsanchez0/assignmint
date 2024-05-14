"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { deleteExam } from "@/server/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import utcToZonedTime from "date-fns-tz/utcToZonedTime";

interface ViewExamDialogProps {
  examID: string;
  closeDialog: () => void;
}

import React, { useState } from "react";
import useExam from "./useExam";

export default function ViewExamDialog({
  examID,
  closeDialog,
}: ViewExamDialogProps) {
  const labelStyle = "font-light";
  const pStyle = "text-lg font-medium";

  const [openEditDialog, setOpenEditDialog] = useState(false);

  const queryClient = useQueryClient();
  const deleteExamMutation = useMutation({
    mutationFn: deleteExam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });

  const { exam, examError, examLoading } = useExam(examID);

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
