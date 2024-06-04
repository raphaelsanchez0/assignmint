import Link from "next/link";
import { SelectItem } from "../ui/select";

interface CoursesSelectContentProps {
  courses: Course[];
}

export default function CoursesSelectContent({
  courses,
}: CoursesSelectContentProps) {
  return (
    <>
      {courses && courses.length > 0 ? (
        courses.map((course) => (
          <SelectItem key={course.id} value={course.id}>
            {course.title}
          </SelectItem>
        ))
      ) : (
        <SelectItem asChild value="">
          <Link href="/settings">Add a Course</Link>
        </SelectItem>
      )}
    </>
  );
}
