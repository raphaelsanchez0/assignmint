import CourseList from "./CourseList";
import Account from "./Account";
import AddCourseDialog from "./AddCourseDialog";

export default function Settings() {
    return (
        <div className="ml-sidebar-width">
            <div className="flex gap-4 p-4">
                <div className="card basis-1/4">
                    <Account />
                </div>
                <div className="card basis-1/4">
                    <CourseList />
                </div>
                <div></div>
            </div>
            {/* Dialog */}
            <AddCourseDialog />
        </div>
    );
}
