import React from 'react'
import Title from './Title'
import AssignmentsList from './AssignmentsList'
import ThisWeek from './ThisWeek'
import MiniCalender from './_MiniCalendar/MiniCalendar'

export default function Dashboard() {
    return (
        <div style={{ width: 'calc(100vw - 4rem)' }}>
            <Title />
            <div className='flex m-4 gap-4'>
                <div className='basis-1/3 '>
                    <AssignmentsList />
                </div>
                <div className='basis-1/3'>
                    <ThisWeek />
                </div>
                <div className='basis-1/3'>
                    <MiniCalender />
                </div>

            </div>
        </div >

    )
}

