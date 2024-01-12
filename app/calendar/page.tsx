import PageTitle from "../_components/PageTitle";
import "./calendar.scss";
import AssignmentsList from "./ExamAndAssignmentList";
import CalenderCard from "./CalendarCard";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getEventsOnDate } from "@/server/apis/api";

export default async function CalendarPage() {
  const queryClient = new QueryClient();

  //Prefetching exams and assignments for today
  await queryClient.prefetchQuery({
    queryKey: ["examsToday"],
    queryFn: () => getEventsOnDate("exams", new Date()),
  });

  await queryClient.prefetchQuery({
    queryKey: ["assignmentsToday"],
    queryFn: () => getEventsOnDate("assignments", new Date()),
  });

  return (
    <div className="ml-sidebar-width">
      <PageTitle title="Calendar" />
      <div className="flex gap-4 p-4">
        <div className="card basis-7/12 h-min">
          <CalenderCard />
        </div>
        <div className="basis-5/12">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <AssignmentsList />
          </HydrationBoundary>
        </div>
      </div>
    </div>
  );
}
