"use client";
import useFormState from "react-dom";
import Dialog from "../_components/Dialogs/Dialog";

import React from "react";
import TitleInput from "../_components/formInputs/TitleInput";

export default function AddCourseDialog() {
    //const [course, formAction] = useFormState(createCourse, null);
    function closeDialog() {
        window.location.href = "/settings";
    }
    return (
        <Dialog
            title="Add Course"
            searchParamKey="addcourse"
            redirect="/settings"
        >
            <form>
                {/* <form action={formAction}> */}

                <div className="grid gap-6 mb-6 grid-cols-2 ">
                    <div>
                        <TitleInput />
                    </div>
                    <div className="col-span-2 flex justify-center">
                        <button
                            type="submit"
                            className="btn shadow-lg"
                            onClick={closeDialog}
                        >
                            Add Course
                        </button>
                    </div>
                </div>
            </form>
        </Dialog>
    );
}
