import { Dialog, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface CourseDialogProps {
  child: React.ReactElement<HTMLButtonElement>;
  course: Course;
}

export default function CourseDialog({ child, course }: CourseDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{child}</DialogTrigger>
      <DialogTitle>{course.title}</DialogTitle>
    </Dialog>
  );
}
