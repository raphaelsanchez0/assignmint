"use client";

import Dialog from "../_components/Dialogs/Dialog";
import { useState } from "react";
import { useFormState } from "react-dom";
import { createExam } from "@/app/_server/actions";
import "react-datepicker/dist/react-datepicker.css";

import CoursesInput from "../_components/formInputs/CoursesInput";
import TitleInput from "../_components/formInputs/TitleInput";
import DateInput from "../_components/formInputs/DateInput";
import NotesInput from "../_components/formInputs/NotesInput";

type CourseType = {
    value: string;
    label: string;
};

interface AddAssignmentDialogProps {
    courses: CourseType[];
}

const AddAssignmentDialog: React.FC<AddAssignmentDialogProps> = ({
    courses,
}) => {
    const [exam, formAction] = useFormState(createExam, null);

    function closeDialog() {
        window.location.href = "/dashboard";
    }

    return (
        <Dialog title="Add Exam" searchParamKey="addexam" redirect="/dashboard">
            <form action={formAction}>
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
                        <button
                            type="submit"
                            className="btn shadow-lg"
                            onClick={closeDialog}
                        >
                            Add Assignment
                        </button>
                    </div>
                </div>
            </form>
        </Dialog>
    );
};

export default AddAssignmentDialog;
