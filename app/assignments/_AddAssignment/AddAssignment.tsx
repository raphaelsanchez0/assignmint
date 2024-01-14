"use client";
import { useFormState } from "react-dom";

import React from "react";

import CoursesInput from "../../../components/formInputs/CoursesInput";
import TitleInput from "../../../components/formInputs/TitleInput";
import DueDateInput from "../../../components/formInputs/DateInput";
import NotesInput from "../../../components/formInputs/NotesInput";

import { createAssignment } from "@/server/actions";
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "@/server/apis/courses";
import PriorityInput from "@/components/formInputs/PriorityInput";

export default function AddAssignment() {
  //Sends formdata to createAssignment server action
  const [formState, formAction] = useFormState(createAssignment, null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const { data, error, isFetched } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  const formattedCourses = data?.map((course) => ({
    label: course.title,
    value: course.id,
  }));

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
      <h3 className="card-title my-4">Add Assignment</h3>
      <hr className="h-px w-full bg-gray-400 border-0" />
      <form action={formAction} onSubmit={handleSubmit} ref={formRef}>
        <div className="grid gap-6 mb-6 grid-cols-2 ">
          <div className="assignment--input-container col-span-1">
            <CoursesInput courses={formattedCourses || []} />
          </div>
          <div>
            <TitleInput />
          </div>
          <div>
            <DueDateInput type="assignment" />
          </div>
          <div>
            <PriorityInput />
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
}
