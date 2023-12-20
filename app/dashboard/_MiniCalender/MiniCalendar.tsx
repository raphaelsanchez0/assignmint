"use client"
import Calendar from "react-calendar"

export default function MiniCalender() {
    return (
        <div className="card">
            <Calendar next2Label={null} prev2Label={null} />
        </div>
    )
}
