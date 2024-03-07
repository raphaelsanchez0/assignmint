"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

interface DateInputProps {
  type: "assignment" | "exam";
  edit?: boolean;
  currentDate?: Date;
}

const DateInput: React.FC<DateInputProps> = ({
  type,
  edit = false,
  currentDate,
}) => {
  const [selectedDate, setSelectedDate] = useState(
    edit ? currentDate : new Date(),
  );

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };
  return (
    <>
      <label htmlFor="due-date" className="assignment--input-header">
        {type === "assignment" ? "Due Date" : "Exam Date"}
      </label>
      <DatePicker
        id="due-date"
        name={type === "assignment" ? "dueDate" : "examDate"}
        selected={selectedDate}
        onChange={handleDateChange}
        className="bg-slate-50 border border-gray-300 
                            text-gray-900 text-sm rounded-lg
                            block w-full p-2.5 dark:bg-zinc-900"
        required
      />
    </>
  );
};

export default DateInput;
