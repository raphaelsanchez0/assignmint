"use client";

import Calendar from "react-calendar";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import "./MiniCalendar.scss";
import { Card } from "@/components/ui/card";

export default function MiniCalender() {
  const router = useRouter();

  const handleDateChange = (value: Date, event: any) => {
    if (Array.isArray(value)) {
      router.push(`/calendar?date=${format(value[0], "yyyy-MM-dd")}`);
    } else {
      router.push(`/calendar?date=${format(value, "yyyy-MM-dd")}`);
    }
  };
  return (
    <Card>
      <Calendar
        next2Label={null}
        prev2Label={null}
        calendarType="gregory"
        onChange={handleDateChange as any}
      />
    </Card>
  );
}
