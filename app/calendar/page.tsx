"use client";

import PageTitle from "../_components/PageTitle";
import Calendar from "react-calendar";
import "./calendar.scss";
import AssignmentsList from "./ExamAndAssignmentList";

import { format } from "date-fns";
import { useSearchParams, useRouter } from "next/navigation";
import CalenderCard from "./CalenderCard";

export default function CalendarPage() {
  // const searchParams = useSearchParams();
  // const router = useRouter();
  // let selectedDateString = searchParams.get("date");
  // let selectedDate = selectedDateString
  //   ? new Date(`${selectedDateString}T00:00`)
  //   : new Date();

  // const handleDateChange = (value: Date, event: any) => {
  //   if (Array.isArray(value)) {
  //     router.push(`/calendar?date=${format(value[0], "yyyy-MM-dd")}`);
  //   } else {
  //     router.push(`/calendar?date=${format(value, "yyyy-MM-dd")}`);
  //   }
  // };

  return (
    <div className="ml-sidebar-width">
      <PageTitle title="Calendar" />
      <div className="flex gap-4 p-4">
        <div className="card basis-7/12 h-min">
          <CalenderCard />
        </div>
        <div className="basis-5/12">
          <AssignmentsList />
        </div>
      </div>
    </div>
  );
}
