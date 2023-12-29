"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

interface DateInputProps {
    type: "assignment" | "exam";
}

const DateInput: React.FC<DateInputProps> = ({ type }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

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
                            block w-full p-2.5"
                required
            />
        </>
    );
};

export default DateInput;
