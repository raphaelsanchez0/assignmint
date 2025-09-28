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
import {
  deleteAssignment,
  getAssignment,
  completeAssignment,
  restoreAssignment,
} from "@/server/apis/assignments";
import LoadingListShorter from "@/components/Loading/LoadingListShorter";
import useAssignment from "./useAssignment";
import { useState } from "react";
import LoadingDialogContent from "../LoadingDialogContent";
import ErrorDialogContent from "../ErrorDialogContent";
import { Slider } from "@/components/ui/slider";

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
  const completeAssignmentMutation = useMutation({
    mutationFn: completeAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
  });
  const restoreAssignmentMutation = useMutation({
    mutationFn: restoreAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
  });

  const { assignment, assignmentError, assignmentLoading } =
    useAssignment(assignmentID);

  if (!assignment && assignmentLoading) {
    return <LoadingDialogContent title="View Assignment" />;
  }
  if (!assignment && assignmentError) {
    return <ErrorDialogContent title="View Assignment" type="assignment" />;
  }
  if (!assignment) return null;

  function handleCompleteAssignment() {
    completeAssignmentMutation.mutate(assignmentID);
    closeDialog();
  }

  function handleRestoreAssignment() {
    restoreAssignmentMutation.mutate(assignmentID);
    closeDialog();
  }

  const labelStyle = "font-light";
  const pStyle = "text-lg font-medium";
  //assignment.progress
  const [progress, setProgress] = useState<number>(0);

  console.log(progress);

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
        {assignment.notes === "" ? null : (
          <div className="col-span-2">
            <Label className={labelStyle}>Notes</Label>
            <p>{assignment.notes}</p>
          </div>
        )}
      </div>
      <div>
        <Slider
          defaultValue={[0]}
          max={100}
          step={5}
          value={[progress]}
          onValueChange={(value) => setProgress(value[0])}
        />
      </div>
      <div className="flex justify-center">
        {!assignment.completed && (
          <>
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
            <button
              className="btn mt-4 ml-4"
              onClick={handleCompleteAssignment}
            >
              Complete
            </button>
          </>
        )}
        {assignment.completed && (
          <button className="btn mt-4 ml-4" onClick={handleRestoreAssignment}>
            Restore
          </button>
        )}
      </div>
    </DialogContent>
  );
};

export default ViewAssignmentDialog;
