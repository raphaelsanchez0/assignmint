interface Assignment {
    id?: string;
    course: Course;
    title: string;
    dueDate: Date | null;
    notes: string;
}

interface Course {
    id: string | null;
    title: string;
    color: string;
}

interface CourseType {
    value: string;
    label: string;
}
