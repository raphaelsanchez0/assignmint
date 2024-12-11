"use client";
import { format, startOfMonth } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { Calendar } from "@/components/ui/card-calendar";
import { Card } from "@/components/ui/card";
import { SelectSingleEventHandler } from "react-day-picker";

import { getDatesWithEventWithinMonth } from "@/server/apis/events";
import "./calendarCard.css";

import { Checkbox } from "@/components/ui/checkbox";

export default function CalenderCard() {
  const searchParams = useSearchParams();
  const router = useRouter();

  let selectedDateString = searchParams.get("date");
  let selectedDate = selectedDateString
    ? new Date(`${selectedDateString}T00:00`)
    : new Date();

  const handleDateSelect: SelectSingleEventHandler = (
    day: Date | undefined,
  ) => {
    if (day) {
      router.push(`/calendar?date=${format(day, "yyyy-MM-dd")}`);
    }
  };
  const [showAssignments, setShowAssignments] = useState(true);
  const [showExams, setShowExams] = useState(true);
  const [datesWithAssignments, setDatesWithAssignments] = useState<Date[]>([]);
  const [datesWithExams, setDatesWithExams] = useState<Date[]>([]);
  const [month, setMonth] = useState<Date>(startOfMonth(selectedDate));
  useEffect(() => {
    const fetchData = async () => {
      const { datesWithAssignments, datesWithExams } =
        await getDatesWithEventWithinMonth(month);
      setDatesWithAssignments(datesWithAssignments);
      setDatesWithExams(datesWithExams);
    };
    fetchData();
  }, [month]);

  const handleClick = async () => {
    await getDatesWithEventWithinMonth(month);
  };

  return (
    <Card>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        month={month}
        onMonthChange={(date) => setMonth(date)}
        modifiers={{
          exam: showExams ? datesWithExams : [],
          assignments: showAssignments ? datesWithAssignments : [],
        }}
        modifiersClassNames={{
          exam: "exam-date",
          assignments: "assignment-date",
        }}
      />
      <div className="flex items-center gap-4 py-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="show-assignments"
            checked={showAssignments}
            onCheckedChange={() => setShowAssignments(!showAssignments)}
          />
          <label
            htmlFor="show-assignments"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Show Assignments
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="show-exams"
            checked={showExams}
            onCheckedChange={() => setShowExams(!showExams)}
          />
          <label
            htmlFor="show-exams"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Show Exams
          </label>
        </div>
      </div>
    </Card>
  );
}
