import CourseList from "./CourseList";
import Account from "./Account";
import AddCourseDialog from "./DeleteCourseDialog";

export default function Settings() {
  return (
    <div className="ml-sidebar-width">
      <div className="flex gap-4 p-4">
        <div className="basis-1/4">
          <Account />
        </div>
        <div className="basis-1/4">
          <CourseList />
        </div>
        <div></div>
      </div>
      {/* Dialog */}
      <AddCourseDialog />
    </div>
  );
}
