import AssignmentsList from "../_components/AssignmentsList/AssignmentsList";
import ThisWeek from "./_ThisWeek/ThisWeek";
import MiniCalender from "./_MiniCalendar/MiniCalendar";
import ExamsList from "../_components/ExamsList/ExamsCard";
import PageTitle from "../_components/PageTitle";
import AddAssignmentDialog from "../_components/Dialogs/AddAssignmentDialog";
import { getExams } from "../../server/apis/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

export default async function Dashboard() {
  const queryClient = new QueryClient();

  return (
    <>
      <div className="ml-sidebar-width">
        <PageTitle title="Dashboard" />
        <div className="flex p-4 gap-4">
          <div className="basis-1/3 ">
            <HydrationBoundary state={dehydrate(queryClient)}>
              <AssignmentsList showAddAssignment />
            </HydrationBoundary>
          </div>
          <div className="basis-1/3">
            <ThisWeek />
          </div>
          <div className="basis-1/3 flex flex-col gap-4">
            <MiniCalender />
            <HydrationBoundary state={dehydrate(queryClient)}>
              <ExamsList showAddExam />
            </HydrationBoundary>
          </div>
        </div>
        {/* Dialogs */}
        <AddAssignmentDialog />
      </div>
    </>
  );
}
