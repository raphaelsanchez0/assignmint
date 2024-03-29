"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface ImportedCanvasCourseProps {
  course: ModifiedCanvasCourse;
  assignmintCourses: Course[];
  onToggleImport: () => void;
  onAssignmintCourseChange: (newCourseID: string) => void;
}

export default function ImportedCanvasCourse({
  course,
  assignmintCourses,
  onToggleImport,
  onAssignmintCourseChange,
}: ImportedCanvasCourseProps) {
  return (
    <div className="w-full h-12">
      <Separator />
      <div className="flex items-center">
        <Checkbox checked={course.import} onCheckedChange={onToggleImport} />
        <h3>{course.name}</h3>
        <Select
          onValueChange={(newCourseID) => onAssignmintCourseChange(newCourseID)}
          value={course.assignmintID}
          disabled={!course.import}
        >
          <SelectTrigger>
            <SelectValue placeholder></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {assignmintCourses?.map((course) => (
              <SelectItem key={course.id} value={course.id}>
                {course.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
