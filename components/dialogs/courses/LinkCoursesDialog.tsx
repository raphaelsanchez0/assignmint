import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface LinkCourseDialogProps {
  children: React.ReactNode;
}

export default function LinkCoursesDialog({ children }: LinkCourseDialogProps) {
  console.log("LinkCoursesDialog");
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Link Courses</DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
