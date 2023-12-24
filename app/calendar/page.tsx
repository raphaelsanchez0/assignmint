"use client"
import PageTitle from "../_components/PageTitle";
import Calendar from "react-calendar"

import { useState } from "react";
import './calendar.scss'
import AssignmentsList from "./AssignmentsList";

import { MouseEvent } from "react";


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

    const handleDateChange = (value: Value, event: any) => {
        if (Array.isArray(value)) {
            setSelectedDate(value[0]);
        } else {
            setSelectedDate(value);

        };
    }


    return (
        <div className="ml-sidebar-width">

            <PageTitle title="Calendar" />
            <div className="flex gap-4 p-4">
                <div className="card basis-7/12 h-min">
                    <Calendar next2Label={null} prev2Label={null}

                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </div>

                <div className="basis-5/12">
                    {selectedDate && <AssignmentsList date={selectedDate} />}
                </div>
            </div>
        </div>



    )
}
