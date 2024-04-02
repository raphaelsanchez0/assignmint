import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AddCourseDialogProps {
  children: React.ReactNode;
}

export default function AddCourseDialog({ children }: AddCourseDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Course</DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
