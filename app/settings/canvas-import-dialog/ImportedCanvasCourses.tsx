"use client";

import { getAllCanvasCourses } from "@/server/canvasAPIActions";
import { useQuery } from "@tanstack/react-query";
import { CoursesDataTable } from "./CoursesDataTable";
import { columns } from "./columns";

interface ImportedCanvasCoursesProps {
  courses: any[];
}

const ImportedCanvasCourses: React.FC<ImportedCanvasCoursesProps> = ({
  courses,
}) => {
  console.log(courses);
  return <CoursesDataTable columns={columns} data={courses} />;
};

export default ImportedCanvasCourses;
