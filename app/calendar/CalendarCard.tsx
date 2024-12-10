"use client";
import { format, startOfMonth } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { Calendar } from "@/components/ui/card-calendar";
import ErrorPage from "next/error";

import { Card } from "@/components/ui/card";
import { SelectSingleEventHandler } from "react-day-picker";
import LoadingListShorter from "@/components/Loading/LoadingListShorter";
import { Button } from "@/components/ui/button";
import { getDatesWithEventWithinMonth } from "@/server/apis/events";
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

  const [datesWithEvents, setDatesWithEvents] = useState<Date[]>([]);
  const [month, setMonth] = useState<Date>(startOfMonth(selectedDate));
  useEffect(() => {
    const fetchData = async () => {
      setDatesWithEvents(await getDatesWithEventWithinMonth(month));
    };
    fetchData();
    console.log(datesWithEvents);
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
          event: datesWithEvents,
        }}
        modifiersClassNames={{
          event: "event-class",
        }}
      />
      <Button onClick={() => handleClick()}>Test</Button>
    </Card>
  );
}
