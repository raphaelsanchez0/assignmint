import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteCourseAlertDialogProps {
  handleDeleteCourse: () => void;
}

export default function DeleteCourseAlertDialog({
  handleDeleteCourse,
}: DeleteCourseAlertDialogProps) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Are You sure you want to delete the course?
        </AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the course
        and any assignments and exams associated with it.
      </AlertDialogDescription>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteCourse}>
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
