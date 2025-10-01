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
  modifyAssignmentProgress,
} from "@/server/apis/assignments";
import LoadingListShorter from "@/components/Loading/LoadingListShorter";
import useAssignment from "./useAssignment";
import { useEffect, useState } from "react";
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
  const [progress, setProgress] = useState<number>(0);

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
  const modifyAssignmentProgressMutation = useMutation({
    mutationFn: ({ id, newProgress }: { id: string; newProgress: number }) =>
      modifyAssignmentProgress(id, newProgress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
  });

  const { assignment, assignmentError, assignmentLoading } =
    useAssignment(assignmentID);

  useEffect(() => {
    if (assignment && typeof assignment.progress === "number") {
      setProgress(assignment.progress);
    }
  }, [assignment]);

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
  const MAX_PROGRESS = 100;

  function handleProgressChange(newProgress: number) {
    setProgress(newProgress);
    modifyAssignmentProgressMutation.mutate({
      id: assignmentID,
      newProgress: newProgress,
    });
    if (newProgress >= MAX_PROGRESS) {
      closeDialog();
    }
  }

  const labelStyle = "font-light";
  const pStyle = "text-lg font-medium";

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
        {!assignment.completed && (
          <div className="col-span-2 flex flex-col gap-3">
            <Label className={labelStyle}>Progress</Label>
            <Slider
              max={100}
              step={5}
              value={[progress]}
              onValueChange={(value) => setProgress(value[0])}
              onValueCommit={(value) => handleProgressChange(value[0])}
            />
          </div>
        )}
      </div>
      <div className="flex justify-center">
        {!assignment.completed && (
          <div className="flex items-center flex-col w-full justify-center gap-4">
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
          </div>
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
