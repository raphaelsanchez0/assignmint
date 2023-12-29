interface Assignment {
    course: string | null;
    title: string;
    dueDate: Date | null;
    notes: string;
}

interface CourseType {
    value: string;
    label: string;
}
