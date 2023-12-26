"use client";
import { useState } from 'react';

import Select from 'react-select'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type CourseType = {
    value: string;
    label: string;
}

interface AddExamProps {
    courses: CourseType[];
}



const AddExam: React.FC<AddExamProps> = ({ courses }) => {
    const [course, setCourse] = useState<CourseType | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [dueDate, setDueDate] = useState<Date | null>(new Date());
    const [notes, setNotes] = useState<string>('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        window.location.href = '/exams';
    }

    return (
        <div className="card">
            <h3 className="card-title my-4">Add Exam</h3>
            <hr className="h-px w-full bg-gray-400 border-0" />
            <form onSubmit={handleSubmit}>
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
                            placeholder="Final Exam"
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
                        <button type='submit' className='btn shadow-lg'>Add Exam</button>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default AddExam