import { Separator } from "@/components/ui/separator";

interface ImportedCanvasCourseProps {
  course: ModifiedCanvasCourse;
  setCourses: React.Dispatch<React.SetStateAction<ModifiedCanvasCourse[]>>;
}

function ImportedCanvasCourse({ course }: ImportedCanvasCourseProps) {
  return (
    <div className="w-full">
      <Separator />
      <div className="flex">
        <div>{course.name}</div>
        <div>{course.id}</div>
      </div>
    </div>
  );
}

export default ImportedCanvasCourse;
