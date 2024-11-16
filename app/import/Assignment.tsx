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

export default function Assignment({ name }: { name: string }) {
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(
    undefined,
  );

  const [importAssignment, setImportAssignment] = useState<boolean>(false);

  const { data: courses, isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  const courseColor = selectedCourseId
    ? courses?.find((course) => course.id === selectedCourseId)?.color
    : undefined;

  // Reset the course selection when `importAssignment` is disabled
  useEffect(() => {
    if (!importAssignment) {
      setSelectedCourseId(undefined);
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
              checked={importAssignment}
              onCheckedChange={(checked) => setImportAssignment(!!checked)}
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
            onValueChange={(value) => setSelectedCourseId(value)}
            value={selectedCourseId || ""}
            disabled={!importAssignment}
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
