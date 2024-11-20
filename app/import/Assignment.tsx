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
import { ImportAssignment } from "./ImportAssignmentsContext";
import { useAssignmentsContext } from "./ImportAssignmentsContext";

interface AssignmentProps {
  name: string;
  date: string;
}

export default function Assignment({ name, date }: AssignmentProps) {
  const { importAssignments, setImportAssignments } = useAssignmentsContext();

  const assignmentKey = `${name}-${date}`;

  const { data: courses, isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  const importAssignment =
    importAssignments[assignmentKey] ||
    ({
      selectedCourseID: undefined,
      title: name,
      dueDate: date,
      importToPlanner: false,
    } as const);

  const courseColor = importAssignment.selectedCourseID
    ? courses?.find((course) => course.id === importAssignment.selectedCourseID)
        ?.color
    : undefined;

  useEffect(() => {
    if (!importAssignment.importToPlanner) {
      setImportAssignments((prev) => ({
        ...prev,
        [assignmentKey]: {
          ...prev[assignmentKey],
          selectedCourseID: undefined,
        },
      }));
    }
  }, [importAssignment.importToPlanner]);

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
                setImportAssignments((prev) => ({
                  ...prev,
                  [assignmentKey]: {
                    ...prev[assignmentKey],
                    importToPlanner: !!checked,
                  },
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
              setImportAssignments((prev) => ({
                ...prev,
                [assignmentKey]: {
                  ...prev[assignmentKey],
                  selectedCourseID: value,
                },
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
