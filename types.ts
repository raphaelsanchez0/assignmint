interface Assignment {
  id: string;
  course: Course;
  title: string;
  dueDate: Date;
  notes: string;
  priority: boolean;
  completed: boolean;
  completedDate: Date;
  progress: number;
}

interface Exam {
  id: string;
  course: Course;
  title: string;
  examDate: Date;
  notes: string;
}

interface Course {
  id: string;
  title: string;
  color: string;
  canvasCourseID?: number;
  canvasCourseName?: string;
}

interface CourseType {
  value: string;
  label: string;
}

interface CanvasCourse {
  id: number;
  name: string;
}

interface ModifiedCanvasCourse extends CanvasCourse {
  import: boolean;
  assignmintID: string | undefined;
}

interface CanvasAssignmentsByDate { [date: string]: string[] }

interface CanvasImportAssignment {
  selectedCourseID: string | undefined;
  title: string;
  dueDate: string;
  importToPlanner: boolean;
}

