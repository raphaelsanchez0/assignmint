import AssignmentsList from "../../components/AssignmentsList/AssignmentsList";
import ThisWeek from "./_ThisWeek/ThisWeek";
import MiniCalender from "./_MiniCalendar/MiniCalendar";
import ExamsList from "../../components/ExamsList/ExamsCard";
import PageTitle from "../../components/PageTitle";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

export default async function Dashboard() {
  const queryClient = new QueryClient();

  return (
    <>
      <div className="mb-sidebar-width md:ml-sidebar-width">
        <PageTitle title="Dashboard" />
        <div className="flex flex-col md:flex-row p-4 gap-4 ">
          <div className="basis-1/3 ">
            <HydrationBoundary state={dehydrate(queryClient)}>
              <AssignmentsList showAddAssignment />
            </HydrationBoundary>
          </div>
          <div className="basis-1/3">
            <ThisWeek />
          </div>
          <div className="basis-1/3 flex flex-col gap-4">
            <div className="hide-when-mobile">
              <MiniCalender />
            </div>
            <div>
              <ExamsList showAddExam />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
