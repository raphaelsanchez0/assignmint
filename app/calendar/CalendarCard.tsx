"use client";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Calendar } from "@/components/ui/card-calendar";

import "./calendar.scss";
import { Card } from "@/components/ui/card";
import { SelectSingleEventHandler } from "react-day-picker";
export default function CalenderCard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  let selectedDateString = searchParams.get("date");
  let selectedDate = selectedDateString
    ? new Date(`${selectedDateString}T00:00`)
    : new Date();

  const handleDateChange = (value: Date, event: any) => {
    if (Array.isArray(value)) {
      router.push(`/calendar?date=${format(value[0], "yyyy-MM-dd")}`);
    } else {
      router.push(`/calendar?date=${format(value, "yyyy-MM-dd")}`);
    }
  };

  const handleDateSelect: SelectSingleEventHandler = (
    day: Date | undefined,
  ) => {
    if (day) {
      router.push(`/calendar?date=${format(day, "yyyy-MM-dd")}`);
    }
  };

  return (
    <Card>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
      />
    </Card>
  );
}
