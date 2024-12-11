import PageTitle from "../../components/PageTitle";
import AssignmentsList from "./ExamAndAssignmentList";
import CalenderCard from "./CalendarCard";
import { QueryClient } from "@tanstack/react-query";
import { getEventsOnDate } from "@/server/apis/api";
import { Card } from "@/components/ui/card";
import { Suspense } from "react";
import LoadingListShorter from "@/components/Loading/LoadingListShorter";
export const dynamic = "force-dynamic";
export default async function CalendarPage() {
  return (
    <>
      <div className="mb-sidebar-width md:ml-sidebar-width">
        <PageTitle title="Calendar" />
        <div className="flex gap-4 p-4 flex-col md:flex-row">
          <div className="basis-7/12 h-min">
            <Suspense fallback={<LoadingListShorter />}>
              <CalenderCard />
            </Suspense>
          </div>
          <div className="basis-5/12">
            <Suspense fallback={<LoadingListShorter />}>
              <AssignmentsList />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
