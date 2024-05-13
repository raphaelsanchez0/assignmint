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
import { format } from "date-fns";
import utcToZonedTime from "date-fns-tz/utcToZonedTime";
import EditAssignmentDialog from "./EditAssignmentDialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteAssignment, getAssignment } from "@/server/apis/assignments";
import LoadingListShorter from "@/components/Loading/LoadingListShorter";
import useAssignment from "./useAssignment";
import { useState } from "react";

interface ViewAssignmentDialogProps {
  assignmentID: string;
  closeDialog: () => void;
}

const ViewAssignmentDialog: React.FC<ViewAssignmentDialogProps> = ({
  assignmentID,
  closeDialog,
}) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const queryClient = useQueryClient();
  const deleteAssignmentMutation = useMutation({
    mutationFn: deleteAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
  });

  const { assignment, assignmentError, assignmentLoading } =
    useAssignment(assignmentID);

  if (assignmentLoading || !assignment) {
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Assignment</DialogTitle>
        </DialogHeader>
        <LoadingListShorter />
      </DialogContent>
    );
  }

  function handleCompleteAssignment() {
    deleteAssignmentMutation.mutate(assignmentID);
    closeDialog();
  }

  const labelStyle = "font-light";
  const pStyle = "text-lg font-medium";

  return (
    <DialogContent className="lg:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>View Assignment</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-2 grid-rows-2 items-center gap-4">
        <div>
          <Label className={labelStyle}>Course</Label>
          <p className={pStyle}>{assignment.course.title}</p>
        </div>

        <div>
          <Label className={labelStyle}>Title</Label>
          <p className={pStyle}>{assignment.title}</p>
        </div>

        <div>
          <Label className={labelStyle}>Due</Label>
          <p className={pStyle}>
            {format(utcToZonedTime(assignment.dueDate, "Etc/UTC"), "MMM d")}
          </p>
        </div>

        <div className="flex items-center justify-start space-x-2 h-full">
          <Checkbox checked={assignment.priority} />
          <div className="space-x-1 leading-none">
            <Label className="text-lg">Priority</Label>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Dialog
          open={openEditDialog}
          onOpenChange={(open) => setOpenEditDialog(open)}
        >
          <DialogTrigger asChild>
            <button className="btn mt-4">Edit</button>
          </DialogTrigger>
          <EditAssignmentDialog
            assignmentID={assignmentID}
            closeDialog={() => setOpenEditDialog(false)}
          />
        </Dialog>
        <button className="btn mt-4 ml-4" onClick={handleCompleteAssignment}>
          Complete
        </button>
      </div>
    </DialogContent>
  );
};

export default ViewAssignmentDialog;
