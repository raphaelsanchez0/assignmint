"use client";

import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { createExam } from "@/server/actions";
import "react-datepicker/dist/react-datepicker.css";

import { getCourses } from "../../server/api";
import Dialog from "../_components/Dialogs/Dialog";
import CoursesInput from "../_components/formInputs/CoursesInput";
import TitleInput from "../_components/formInputs/TitleInput";
import DateInput from "../_components/formInputs/DateInput";
import NotesInput from "../_components/formInputs/NotesInput";
import { useRouter } from "next/navigation";

export default function AddAssignmentDialog() {
  const router = useRouter();
  const [formState, formAction] = useFormState(createExam, null);
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
    router.push("/dashboard");
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
}
