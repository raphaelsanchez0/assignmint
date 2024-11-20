"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCourses } from "@/server/apis/courses";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

interface AssignmentProps {
  name: string;
  date: string;
}

interface ImportAssignment {
  selectedCourseID: string | undefined;
  title: string;
  dueDate: string;
  importToPlanner: boolean;
}

export default function Assignment({ name, date }: AssignmentProps) {
  const [importAssignment, setImportAssignment] = useState<ImportAssignment>({
    selectedCourseID: undefined,
    title: name,
    dueDate: date,
    importToPlanner: false,
  });

  const { data: courses, isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  const courseColor = importAssignment.selectedCourseID
    ? courses?.find((course) => course.id === importAssignment.selectedCourseID)
        ?.color
    : undefined;

  // Reset the course selection when `importAssignment` is disabled
  useEffect(() => {
    if (!importAssignment) {
      setImportAssignment((prevAssignment) => ({
        ...prevAssignment,
        selectedCourseID: undefined,
      }));
    }
  }, [importAssignment]);

  if (coursesLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-row w-full hover:bg-gray-100 dark:hover:bg-zinc-800">
      {/* Color Bar */}
      <div
        className="w-2"
        style={{ backgroundColor: courseColor || "transparent" }}
      ></div>
      <div className="p-1 flex justify-between items-center w-full gap-4">
        <div className="w-1/2 flex justify-start items-center">
          {/* Label with Checkbox and Assignment Name */}
          <label
            htmlFor={`import-${name}`}
            className="flex items-center space-x-2 w-full cursor-pointer px-1 truncate"
          >
            <Checkbox
              id={`import-${name}`}
              checked={importAssignment.importToPlanner}
              onCheckedChange={(checked) =>
                setImportAssignment((prevAssignment) => ({
                  ...prevAssignment,
                  importToPlanner: !!checked,
                }))
              }
            />
            <span
              className="text-md font-medium text-off-black truncate"
              title={name}
            >
              {name}
            </span>
          </label>
        </div>

        {/* Course Select */}
        <div className="w-1/2">
          <Select
            onValueChange={(value) =>
              setImportAssignment((prevAssignment) => ({
                ...prevAssignment,
                selectedCourseID: value,
              }))
            }
            value={importAssignment.selectedCourseID || ""}
            disabled={!importAssignment.importToPlanner}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a Course" />
            </SelectTrigger>
            <SelectContent>
              {courses?.map((course) => (
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
}
