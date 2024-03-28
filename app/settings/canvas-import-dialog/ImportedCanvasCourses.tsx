"use client";

import { getAllCanvasCourses } from "@/server/canvasAPIActions";
import { useQuery } from "@tanstack/react-query";

interface ImportedCanvasCoursesProps {
  courses: any[];
}

const ImportedCanvasCourses: React.FC<ImportedCanvasCoursesProps> = ({
  courses,
}) => {
  console.log(courses);
  return <div>ImportedCanvasCourses</div>;
};

export default ImportedCanvasCourses;
