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
import { memo } from "react";

interface ImportedCanvasCourseProps {
  course: ModifiedCanvasCourse;
  assignmintCourses: Course[];
  onToggleImport: () => void;
  onAssignmintCourseChange: (newCourseID: string) => void;
}

const ImportedCanvasCourse = ({
  course,
  assignmintCourses,
  onToggleImport,
  onAssignmintCourseChange,
}: ImportedCanvasCourseProps) => {
  console.log(course);
  return (
    <div className="w-full h-18">
      <Separator />
      <div className="grid grid-cols-10 items-center">
        <div className="col-span-1 flex items-center ">
          <Checkbox checked={course.import} onCheckedChange={onToggleImport} />
        </div>
        <div className="col-span-5">
          <h3>{course.name}</h3>
        </div>
        <div className="col-span-4">
          <Select
            key={course.assignmintID || "none"}
            onValueChange={(newCourseID) =>
              onAssignmintCourseChange(newCourseID)
            }
            value={course.assignmintID}
            disabled={!course.import}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select class"></SelectValue>
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
    </div>
  );
};

export default memo(ImportedCanvasCourse);
