"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { use, useEffect, useState } from "react";
import ImportedCanvasCourse from "./ImportedCanvasCourseRow";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import ImportCanvasTableHeader from "./ImportCanvasTableHeader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { linkCanvasCoursesToAssignmintCourses } from "@/server/canvasAPIActions";
import { getCourses } from "@/server/apis/courses";

interface ImportedCanvasCourseTableProps {
  modifiedCanvasCourses: ModifiedCanvasCourse[];
}

export default function ImportedCanvasCoursesTable({
  modifiedCanvasCourses,
}: ImportedCanvasCourseTableProps) {
  const queryClient = useQueryClient();

  const { data: assignmintCourses } = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  const [courses, setCourses] = useState<ModifiedCanvasCourse[]>(
    modifiedCanvasCourses,
  );

  const [query, setQuery] = useState("");

  const filteredByQueryCanvasCourses = courses.filter((course) => {
    return course.name.toLowerCase().includes(query.toLowerCase());
  });

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

    if (assignmintCourses) {
      return assignmintCourses.filter(
        (course) =>
          !selectedAssignmintCoursesIDs.has(course.id) ||
          courses.find((c) => c.id === currentCourseID)?.assignmintID ===
            course.id,
      );
    }
    return [];
  };

  const linkCoursesMutation = useMutation({
    mutationFn: linkCanvasCoursesToAssignmintCourses,
  });

  function handleLinkCourses() {
    linkCoursesMutation.mutate(courses);
  }

  return (
    <div className="w-full">
      <div>
        <Input
          placeholder="Search Your Canvas Courses"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <ImportCanvasTableHeader />
      <Separator />
      <div>
        <ScrollArea className="h-96">
          {filteredByQueryCanvasCourses.map((course) => (
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
      <div className="flex justify-center mt-4">
        <button className="btn" onClick={handleLinkCourses}>
          Link Assignments
        </button>
      </div>
    </div>
  );
}
