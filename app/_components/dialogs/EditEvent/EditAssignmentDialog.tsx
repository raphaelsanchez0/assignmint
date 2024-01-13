"use client";
import React, { useEffect, useState } from "react";
import CoursesInput from "../../formInputs/CoursesInput";
import TitleInput from "../../formInputs/TitleInput";
import DateInput from "../../formInputs/DateInput";
import PriorityInput from "../../formInputs/PriorityInput";
import NotesInput from "../../formInputs/NotesInput";
import Dialog from "./EditEventDialog";
import { useFormState } from "react-dom";
import { createAssignment } from "@/server/actions";
import { getCourses } from "@/server/apis/courses";

export default function EditAssignmentDialog() {
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
    <Dialog title="Edit Assignment" searchParamKey="edit" redirect="/dashboard">
      <form action={formAction}>
        <div className="grid gap-6 mb-6 grid-cols-2 ">
          <div className="assignment--input-container">
            <CoursesInput courses={courses} />
          </div>
          <div>
            <TitleInput />
          </div>
          <div>
            <DateInput type="assignment" />
          </div>
          <div>
            <PriorityInput />
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
