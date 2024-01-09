"use client";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { createAssignment } from "@/server/actions";
import Dialog from "../_components/Dialogs/Dialog";
import { getCourses } from "../../server/actions";

import CoursesInput from "../_components/formInputs/CoursesInput";
import TitleInput from "../_components/formInputs/TitleInput";
import DateInput from "../_components/formInputs/DateInput";
import NotesInput from "../_components/formInputs/NotesInput";

interface AddAssignmentDialogProps {}

export default function AddAssignmentDialog() {
    //Sends formdata to createAssignment server action
    const [assignment, formAction] = useFormState(createAssignment, null);
    const [courses, setCourses] = useState<CourseType[]>([]);

    //Gets courses from server and formats them for the CoursesInput component
    useEffect(() => {
        const fetchCourses = async () => {
            const coursesFromServer = await getCourses();
            const formattedCourses = coursesFromServer.map((course) => ({
                label: course.title,
                value: course.id,
            }));
            setCourses(formattedCourses);
        };
        fetchCourses();
    }, []);

    function closeDialog() {
        window.location.href = "/dashboard";
    }

    return (
        <Dialog
            title="Add Assignment"
            searchParamKey="addassignment"
            redirect="/dashboard"
        >
            <form action={formAction}>
                <div className="grid gap-6 mb-6 grid-cols-2 ">
                    <div className="assignment--input-container col-span-2">
                        <CoursesInput courses={courses} />
                    </div>
                    <div>
                        <TitleInput />
                    </div>
                    <div>
                        <DateInput type="assignment" />
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
}
