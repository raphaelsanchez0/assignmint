"use client";

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
        course.id === courseId
          ? {
              ...course,
              import: !course.import,
              assignmintID: !course.import ? course.assignmintID : undefined,
            }
          : course,
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

  const getUnselectedCourses = (currentCourseID: number) => {
    const selectedAssignmintCoursesIDs = new Set(
      courses.map((course) => course.assignmintID),
    );

    return assignmintCourses.filter(
      (course) =>
        !selectedAssignmintCoursesIDs.has(course.id) ||
        courses.find((c) => c.id === currentCourseID)?.assignmintID ===
          course.id,
    );
  };

  return (
    <div className="w-full">
      <ScrollArea>
        {courses.map((course) => (
          <ImportedCanvasCourse
            key={course.id}
            course={course}
            assignmintCourses={getUnselectedCourses(course.id)}
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
