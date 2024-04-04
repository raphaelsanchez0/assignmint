import {
  DialogContent,
  DialogHeader,
  DialogOverlay,
} from "@/components/ui/dialog";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  useQuery,
} from "@tanstack/react-query";

import {
  fetchAssignments,
  getPriorityAssignments,
} from "@/server/apis/assignments";
import { getCourses } from "@/server/actions";
import ImportedCanvasCourses from "./ImportCanvasCoursesTable";
import {
  getAllCanvasCourses,
  getCourseAssignmentsFromCanvas,
} from "@/server/canvasAPIActions";
import { addAttributesToCanvasCourse } from "@/utils/canvas-imports/canvas-imports-helper";

export default async function ImportCanvasCoursesDialog() {
  const canvasCourses = await getAllCanvasCourses();

  const modifiedCanvasCourses = addAttributesToCanvasCourse(canvasCourses);

  const assignmentCourses = await getCourses();
  assignmentCourses.map(async (course) => {
    const assignments = await getCourseAssignmentsFromCanvas(course);
    console.log(assignments);
  });

  return (
    <DialogContent>
      <DialogHeader>Import Canvas Courses</DialogHeader>
      <ImportedCanvasCourses modifiedCanvasCourses={modifiedCanvasCourses} />
    </DialogContent>
  );
}
