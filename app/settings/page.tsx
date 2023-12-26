import CourseList from "./CourseList";
import Account from "./Account";


export default function Settings() {
    return (
        <div className="ml-sidebar-width">
            <div className="flex gap-4 p-4">
                <div className="card basis-1/3">
                    <Account />
                </div>
                <div className="card basis-1/3">
                    <CourseList />
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}
