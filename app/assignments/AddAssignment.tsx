"use client";

import Select from 'react-select'
import { useState } from 'react';

type CourseType = {
    value: string;
    label: string;
}

interface AddAssignmentProps {
    courses: CourseType[];
}


const AddAssignment: React.FC<AddAssignmentProps> = ({ courses }) => {
    return (
        <div className="card">
            <h3 className="card-title pb-4">Add Assignment</h3>
            <hr className="h-px w-full bg-gray-400 border-0" />
            <div className="grid-cols-2 grid-rows-6">
                <form>
                    <div className="col-span-1">
                        <h2 className="text-off-black text-xl p-1 font-semibold">Subject</h2>
                        <Select
                            options={courses} name='course' className='w-1/2'
                        >
                        </Select>
                    </div>
                </form>



            </div>

        </div>
    )
}

export default AddAssignment