"use client";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { Calendar } from "@/components/ui/card-calendar";
import ErrorPage from 'next/error'

import { Card } from "@/components/ui/card";
import { SelectSingleEventHandler } from "react-day-picker";
import LoadingListShorter from "@/components/Loading/LoadingListShorter";
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
