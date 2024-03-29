import { DialogContent, DialogHeader } from "@/components/ui/dialog";
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
import { getAllCanvasCourses } from "@/server/canvasAPIActions";
import { addAttributesToCanvasCourse } from "@/utils/canvas-imports/canvas-imports-helper";

const mockData: ModifiedCanvasCourse[] = [
  {
    id: 1,
    name: "Course 1",
    import: false,
    assignmintID: null,
  },
  {
    id: 2,
    name: "Course 2",
    import: false,
    assignmintID: null,
  },
  {
    id: 3,
    name: "Course 3",
    import: false,
    assignmintID: null,
  },
];

export default async function ImportCanvasCoursesDialog() {
  const courses = await getAllCanvasCourses();
  const modifiedCourses = addAttributesToCanvasCourse(courses);
  return (
    <DialogContent>
      <DialogHeader>Import Canvas Courses</DialogHeader>
      <ImportedCanvasCourses modifiedCourses={mockData} />
    </DialogContent>
  );
}
