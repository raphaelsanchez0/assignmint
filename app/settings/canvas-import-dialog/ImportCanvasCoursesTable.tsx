"use client";

import { getAllCanvasCourses } from "@/server/canvasAPIActions";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import ImportedCanvasCourse from "./ImportedCanvasCourse";

interface ImportedCanvasCourseTableProps {
  modifiedCanvasCourses: ModifiedCanvasCourse[];
  assignmintCourses: Course[];
}

export default function ImportedCanvasCoursesTable({
  modifiedCanvasCourses,
  assignmintCourses,
}: ImportedCanvasCourseTableProps) {
  const [courses, setCourses] = useState<ModifiedCanvasCourse[]>(
    modifiedCanvasCourses,
  );

  const handleToggleImport = (courseId: number) => {
    setCourses((currentCourses) =>
      currentCourses.map((course) =>
        course.id === courseId ? { ...course, import: !course.import } : course,
      ),
    );
  };

  const handleLinkedAssignmentCourseChange = (
    courseId: number,
    newAssignmintID: string,
  ) => {
    setCourses((currentCourses) =>
      currentCourses.map((course) =>
        course.id === courseId
          ? { ...course, assignmintID: newAssignmintID }
          : course,
      ),
    );
  };

  return (
    <div className="w-full">
      <ScrollArea>
        {courses.map((course) => (
          <ImportedCanvasCourse
            key={course.id}
            course={course}
            assignmintCourses={assignmintCourses}
            onToggleImport={() => handleToggleImport(course.id)}
            onAssignmintCourseChange={(newCourseID) =>
              handleLinkedAssignmentCourseChange(course.id, newCourseID)
            }
          />
        ))}
      </ScrollArea>
    </div>
  );
}
