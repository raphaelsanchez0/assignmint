"use client";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Calendar from "react-calendar";

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

  return (
    <Calendar
      next2Label={null}
      prev2Label={null}
      value={selectedDate}
      onChange={handleDateChange as any}
    />
  );
}
