"use client";

import { getAllCanvasCourses } from "@/server/canvasAPIActions";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import ImportedCanvasCourse from "./ImportedCanvasCourse";

interface ImportedCanvasCourseTableProps {
  modifiedCourses: ModifiedCanvasCourse[];
}

export default function ImportedCanvasCoursesTable({
  modifiedCourses,
}: ImportedCanvasCourseTableProps) {
  const [courses, setCourses] =
    useState<ModifiedCanvasCourse[]>(modifiedCourses);

  return (
    <div className="w-full">
      <ScrollArea>
        {courses.map((course) => (
          <ImportedCanvasCourse
            key={course.id}
            course={course}
            setCourses={setCourses}
          />
        ))}
      </ScrollArea>
    </div>
  );
}
