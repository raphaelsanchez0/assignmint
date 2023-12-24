"use client";
import { useState } from 'react';

import Select from 'react-select'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type CourseType = {
    value: string;
    label: string;
}

interface AddAssignmentProps {
    courses: CourseType[];
}



const AddAssignment: React.FC<AddAssignmentProps> = ({ courses }) => {
    const [course, setCourse] = useState<CourseType | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [dueDate, setDueDate] = useState<Date | null>(new Date());
    const [notes, setNotes] = useState<string>('');

    return (
        <div className="card">
            <h3 className="card-title my-4">Add Assignment</h3>
            <hr className="h-px w-full bg-gray-400 border-0" />
            <form>
                <div className="grid gap-6 mb-6 grid-cols-2 ">

                    <div className="assignment--input-container col-span-2">
                        <label className="assignment--input-header" htmlFor='course'>Course</label>
                        <Select
                            id='course'
                            options={courses} name='course'
                            className='w-1/2 border-slate-400 bg-slate-50'
                            required
                        >
                        </Select>
                    </div>
                    <div>
                        <label htmlFor="title" className="assignment--input-header">Title</label>
                        <input
                            id="title"
                            type="text"
                            className="bg-slate-50 border border-gray-300 
                            text-gray-900 text-sm rounded-lg
                            block w-full p-2.5  
                          caret-gray-500"
                            placeholder="CS 1114"
                            required />
                    </div>
                    <div>
                        <label htmlFor="due-date" className="assignment--input-header">Due Date</label>
                        <DatePicker
                            id="due-date"
                            selected={dueDate}
                            onChange={(date: Date) => setDueDate(date)}
                            className='bg-slate-50 border border-gray-300 
                            text-gray-900 text-sm rounded-lg
                            block w-full p-2.5'
                            required
                        />
                    </div>
                    <div className='col-span-2'>
                        <label htmlFor="notes" className="assignment--input-header">Notes</label>
                        <textarea
                            id="notes"
                            className="bg-slate-50 border border-gray-300 
                            text-gray-900 text-sm rounded-lg
                            block w-full p-2.5 resize-none"
                            placeholder="Notes"
                        />
                    </div>
                    <div className='col-span-2 flex justify-center'>
                        <button type='submit' className='btn shadow-lg'>Add Assignment</button>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default AddAssignment