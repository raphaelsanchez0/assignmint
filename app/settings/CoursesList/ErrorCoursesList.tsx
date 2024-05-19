import { Card } from "@/components/ui/card";

export default function ErrorCoursesList() {
  return (
    <Card>
      <h3 className="card-title">Courses</h3>
      <p className="text-gray-500 dark:text-gray-600 text-sm italic text-center pt-4">
        There was an error loading your courses. Please try again later.
      </p>
    </Card>
  );
}
