"use client"

import Calendar from "react-calendar"
import './MiniCalendar.scss'

export default function MiniCalender() {
    return (
        <div className="card">
            <Calendar next2Label={null} prev2Label={null}
                calendarType="gregory" />
        </div>
    )
}
