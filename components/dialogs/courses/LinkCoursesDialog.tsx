import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCourses } from "@/server/apis/courses";
import { getAllCanvasCourses } from "@/server/canvasAPI";
import { useQuery } from "@tanstack/react-query";

interface LinkCourseDialogProps {
  children: React.ReactNode;
  course: Course;
}

export default function LinkCoursesDialog({
  children,
  course,
}: LinkCourseDialogProps) {
  console.log("LinkCoursesDialog");

  const { data: assignmintCourses } = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  // const { data: canvasCourses } = useQuery<CanvasCourse[]>({
  //   queryKey: ["canvasCourses"],
  //   queryFn: getAllCanvasCourses,
  // });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Link Courses from Canvas</DialogHeader>
        <DialogTitle>{course.title}</DialogTitle>

        <Select value={course.canvasCourseID?.toString()}>
          <SelectTrigger>
            <SelectValue></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {assignmintCourses?.map((currentCourse) => (
              <SelectItem
                key={currentCourse.id}
                value={currentCourse.id.toString()}
              >
                {currentCourse.canvasCourseName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </DialogContent>
    </Dialog>
  );
}
