interface Assignment {
  id: string;
  course: Course;
  title: string;
  dueDate: Date;
  notes: string;
  priority: boolean;
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
}

interface CourseType {
  value: string;
  label: string;
}
