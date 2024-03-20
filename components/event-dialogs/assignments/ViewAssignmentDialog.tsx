import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import utcToZonedTime from "date-fns-tz/utcToZonedTime";

interface ViewAssignmentDialogProps {
  assignment: Assignment;
  setOpen: (open: boolean) => void;
  handleDialogOpenChangeFn: (open: boolean) => void;
}

const ViewAssignmentDialog: React.FC<ViewAssignmentDialogProps> = ({
  assignment,
  setOpen,
  handleDialogOpenChangeFn,
}) => {
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
    </DialogContent>
  );
};

export default ViewAssignmentDialog;
