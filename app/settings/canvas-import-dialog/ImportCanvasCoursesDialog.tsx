import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  useQuery,
} from "@tanstack/react-query";
import { CoursesDataTable } from "./CoursesDataTable";

import {
  fetchAssignments,
  getPriorityAssignments,
} from "@/server/apis/assignments";
import { getCourses } from "@/server/actions";
import ImportedCanvasCourses from "./ImportedCanvasCourses";
import { getAllCanvasCourses } from "@/server/canvasAPIActions";
import { addAttributesToCanvasCourse } from "@/utils/canvas-imports/canvas-imports-helper";

export default async function ImportCanvasCoursesDialog() {
  const courses = await getAllCanvasCourses();
  const modifiedCourses = addAttributesToCanvasCourse(courses);
  return (
    <DialogContent>
      <DialogHeader>Import Canvas Courses</DialogHeader>
      <ImportedCanvasCourses courses={modifiedCourses} />
    </DialogContent>
  );
}
