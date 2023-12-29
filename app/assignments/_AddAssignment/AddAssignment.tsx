"use client";
import { useFormState } from "react-dom";

import CoursesInput from "../../_components/formInputs/CoursesInput";
import TitleInput from "../../_components/formInputs/TitleInput";
import DueDateInput from "../../_components/formInputs/DueDateInput";
import NotesInput from "../../_components/formInputs/NotesInput";

import { createAssignment } from "@/app/_actions/actions";

interface AddAssignmentProps {
    courses: CourseType[];
}

const AddAssignment: React.FC<AddAssignmentProps> = ({ courses }) => {
    //Sends formdata to createAssignment server action
    const [assignment, formAction] = useFormState(createAssignment, null);

    return (
        <div className="card">
            <h3 className="card-title my-4">Add Assignment</h3>
            <hr className="h-px w-full bg-gray-400 border-0" />
            <form action={formAction}>
                <div className="grid gap-6 mb-6 grid-cols-2 ">
                    <div className="assignment--input-container col-span-2">
                        <CoursesInput courses={courses} />
                    </div>
                    <div>
                        <TitleInput />
                    </div>
                    <div>
                        <DueDateInput />
                    </div>
                    <div className="col-span-2">
                        <NotesInput />
                    </div>
                    <div className="col-span-2 flex justify-center">
                        <button type="submit" className="btn shadow-lg">
                            Add Assignment
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddAssignment;
