"use client"

import PageTitle from "../_components/PageTitle";
import Calendar from "react-calendar"
import './calendar.scss'
import AssignmentsList from "./AssignmentsList";

import { format } from 'date-fns'
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react";


export default function CalendarPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    let selectedDateString = searchParams.get('date')
    let selectedDate = selectedDateString ? new Date(`${selectedDateString}T00:00`) : new Date()

    const handleDateChange = (value: Date, event: any) => {
        if (Array.isArray(value)) {
            router.push(`/calendar?date=${format(value[0], 'yyyy-MM-dd')}`)
        } else {
            router.push(`/calendar?date=${format(value, 'yyyy-MM-dd')}`)
        };
    }

    useEffect(() => {
        router.replace('/calendar');
    }, []);

    return (
        <div className="ml-sidebar-width">

            <PageTitle title="Calendar" />
            <div className="flex gap-4 p-4">
                <div className="card basis-7/12 h-min">
                    <Calendar next2Label={null} prev2Label={null}
                        value={selectedDate}
                        onChange={handleDateChange as any}
                    />
                </div>
                <div className="basis-5/12">
                    <AssignmentsList date={selectedDate} />
                </div>
            </div>
        </div>



    )
}
