"use client";
import { format, startOfMonth } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { Calendar } from "@/components/ui/card-calendar";
import { Card } from "@/components/ui/card";
import { SelectSingleEventHandler } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { getDatesWithEventWithinMonth } from "@/server/apis/events";
import "./calendarCard.css";

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
          exam: datesWithExams,
          assignments: datesWithAssignments,
        }}
        modifiersClassNames={{
          exam: "exam-date",
          assignments: "assignment-date",
        }}
      />
      <Button onClick={() => handleClick()}>Test</Button>
    </Card>
  );
}
