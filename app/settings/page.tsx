import CourseList from "./CoursesList/CoursesList";
import Account from "./Account";
import InstallExtension from "./InstallExtension/InstallExtension";
import IssuesAndHelp from "./IssuesHelp/IssuesAndHelp";

export default function Settings() {
  return (
    <div className="mb-sidebar-width md:ml-sidebar-width">
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="basis-1/4">
          <Account />
        </div>
        <div className="basis-1/4">
          <CourseList />
        </div>
        <div className="basis-1/4">
          <InstallExtension />
        </div>
        <div className="basis-1/4">
          <IssuesAndHelp />
        </div>
      </div>
    </div>
  );
}
