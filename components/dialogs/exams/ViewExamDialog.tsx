"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import LoadingDialogContent from "../LoadingDialogContent";
import ErrorDialogContent from "../ErrorDialogContent";
import EditExamDialog from "./EditExamDialog";

export default function ViewExamDialog({
  examID,
  closeDialog,
}: ViewExamDialogProps) {
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const queryClient = useQueryClient();
  const deleteExamMutation = useMutation({
    mutationFn: deleteExam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });

  const { exam, examError, examLoading } = useExam(examID);

  if (!exam && examLoading) {
    return <LoadingDialogContent title="View Exam" />;
  }

  if (!exam && examError) {
    return <ErrorDialogContent title="View Exam" type="exam" />;
  }

  if (!exam) return null;

  function handleDeleteExam() {
    deleteExamMutation.mutate(examID);
    closeDialog();
  }

  const labelStyle = "font-light";
  const pStyle = "text-lg font-medium";
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
        <div></div>
        {exam.notes === "" ? null : (
          <div className="col-span-2">
            <Label className={labelStyle}>Notes</Label>
            <p>{exam.notes}</p>
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <Dialog
          open={openEditDialog}
          onOpenChange={(open) => setOpenEditDialog(open)}
        >
          <DialogTrigger asChild>
            <button className="btn mt-4">Edit</button>
          </DialogTrigger>
          <EditExamDialog
            examID={examID}
            closeDialog={() => setOpenEditDialog(false)}
          />
        </Dialog>
        <button className="btn mt-4 ml-4" onClick={handleDeleteExam}>
          Delete
        </button>
      </div>
    </DialogContent>
  );
}
