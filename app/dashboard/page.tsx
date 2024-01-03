import AssignmentsList from "../_components/AssignmentsList/AssignmentsList";
import ThisWeek from "./_ThisWeek/ThisWeek";
import MiniCalender from "./_MiniCalendar/MiniCalendar";
import ExamsList from "../_components/ExamsList/ExamsList";
import PageTitle from "../_components/PageTitle";
import Dialog from "../_components/Dialogs/Dialog";
import AddAssignmentDialog from "./AddAssignmentDialog";
import AddExamDialog from "./AddExamDialog";

export default function Dashboard() {
    return (
        <>
            <div className="ml-sidebar-width">
                <PageTitle title="Dashboard" />
                <div className="flex p-4 gap-4">
                    <div className="basis-1/3 ">
                        <AssignmentsList showAddAssignment />
                    </div>
                    <div className="basis-1/3">
                        <ThisWeek />
                    </div>
                    <div className="basis-1/3 flex flex-col gap-4">
                        <MiniCalender />
                        <ExamsList showAddExam />
                    </div>
                </div>
                {/* Dialogs */}
                <AddAssignmentDialog />
                <AddExamDialog />
            </div>
        </>
    );
}
