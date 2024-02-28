"use client";

import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import "./MiniCalendar.scss";
import { Card } from "@/components/ui/card";
import React from "react";
import { SelectSingleEventHandler } from "react-day-picker";

export default function MiniCalender() {
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const router = useRouter();

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
        selected={new Date()}
        onSelect={handleDateSelect}
      />
    </Card>
  );
}
