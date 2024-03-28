import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  useQuery,
} from "@tanstack/react-query";
import { CoursesDataTable } from "./CoursesDataTable";
import { CanvasCourses, columns } from "./columns";

import {
  fetchAssignments,
  getPriorityAssignments,
} from "@/server/apis/assignments";
import { getCourses } from "@/server/actions";
import ImportedCanvasCourses from "./ImportedCanvasCourses";
import { getAllCanvasCourses } from "@/server/canvasAPIActions";

export default async function ImportCanvasCoursesDialog() {
  const courses = await getAllCanvasCourses();
  return (
    <DialogContent>
      <DialogHeader>Import Canvas Courses</DialogHeader>
      <ImportedCanvasCourses courses={courses} />
    </DialogContent>
  );
}
