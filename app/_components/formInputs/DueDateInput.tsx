"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

export default function DueDateInput() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };
    return (
        <>
            <label htmlFor="due-date" className="assignment--input-header">
                Due Date
            </label>
            <DatePicker
                id="due-date"
                name="due-date"
                selected={selectedDate}
                onChange={handleDateChange}
                className="bg-slate-50 border border-gray-300 
                            text-gray-900 text-sm rounded-lg
                            block w-full p-2.5"
                required
            />
        </>
    );
}
