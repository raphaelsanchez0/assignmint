import AddCourseDialogTrigger from "@/components/dialogs/courses/AddCourseDialog";

import { Card } from "@/components/ui/card";

export default function NewCourseList() {
  return (
    <Card>
      <div className="flex justify-between items-center mb-2">
        <h3 className="card-title">Courses</h3>
        <AddCourseDialogTrigger>
          <button className="btn">Add</button>
        </AddCourseDialogTrigger>
      </div>
    </Card>
  );
}
