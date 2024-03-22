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

interface ViewAssignmentDialogProps {
  assignment: Assignment;
  setOpen: (open: boolean, swapTo?: string) => void;
  swapDialogFn: (to: "edit" | "view") => void;
}

const ViewAssignmentDialog: React.FC<ViewAssignmentDialogProps> = ({
  assignment,
  swapDialogFn,
}) => {
  const labelStyle = "font-light";
  const pStyle = "text-lg font-medium";

  function handleEditAssignment() {
    swapDialogFn("edit");
  }

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
        <button className="btn mt-4" onClick={handleEditAssignment}>
          Edit
        </button>
      </div>
    </DialogContent>
  );
};

export default ViewAssignmentDialog;
