"use client";
import useFormState from "react-dom";
import Dialog from "../../components/dialogs/addEvent/AddEventDialog";

import React from "react";
import TitleInput from "../../components/formInputs/TitleInput";

export default function DeleteCourseDialog() {
  //const [course, formAction] = useFormState(createCourse, null);
  function closeDialog() {
    window.location.href = "/settings";
  }
  return (
    <Dialog
      title="Add Course"
      searchParamKey="removecourse"
      redirect="/settings"
    >
      <form>
        {/* <form action={formAction}> */}

        <div className="grid gap-6 mb-6 grid-cols-2 ">
          <div>
            <TitleInput placeholder="CS1114" />
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
