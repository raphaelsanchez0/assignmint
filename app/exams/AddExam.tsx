"use client";
import { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import CoursesInput from "../_components/formInputs/CoursesInput";
import DateInput from "../_components/formInputs/DateInput";
import NotesInput from "../_components/formInputs/NotesInput";
import TitleInput from "../_components/formInputs/TitleInput";
import { useFormState } from "react-dom";
import { createExam } from "../_server/actions";
import React from "react";

type CourseType = {
    value: string;
    label: string;
};

interface AddExamProps {
    courses: CourseType[];
}

const AddExam: React.FC<AddExamProps> = ({ courses }) => {
    const [formState, formAction] = useFormState(createExam, null);
    const formRef = React.useRef<HTMLFormElement>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // waits for form to be submitted before clearing
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            formAction(formData);
            formRef.current.reset();
        }
    };
    return (
        <div className="card">
            <h3 className="card-title my-4">Add Exam</h3>
            <hr className="h-px w-full bg-gray-400 border-0" />
            <form action={formAction} ref={formRef} onSubmit={handleSubmit}>
                <div className="grid gap-6 mb-6 grid-cols-2 ">
                    <div className="assignment--input-container col-span-2">
                        <CoursesInput courses={courses} />
                    </div>
                    <div>
                        <TitleInput />
                    </div>
                    <div>
                        <DateInput type="exam" />
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

export default AddExam;
