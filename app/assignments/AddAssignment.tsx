"use client";

import Select from 'react-select'

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
            <h3 className="card-title mb-3">Add Assignment</h3>
            <div className="grid-cols-2 grid-rows-6">
                <div className="col-span-1">
                    <h2 className="text-off-black text-xl">Subject</h2>
                    <Select className=" select-bordered bg-white 
                    w-full max-w-xs text-off-black border-gray-500"
                        options={courses}
                    >

                    </Select>
                </div>

            </div>

        </div>
    )
}

export default AddAssignment