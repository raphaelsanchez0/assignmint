import React from 'react'
import Course from './Course'

export default function CourseList() {
    return (
        <>
            <div className='flex justify-between items-center mb-2'>
                <h3 className='card-title'>Courses</h3>
                <button className="btn">Add</button>
            </div>
            <div>
                <Course name={"CS1114"} color='red' />
            </div>
        </>
    )
}
