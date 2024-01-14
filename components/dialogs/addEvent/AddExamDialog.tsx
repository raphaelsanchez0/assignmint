"use client";

import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { createExam } from "@/server/actions";
import "react-datepicker/dist/react-datepicker.css";

import { getCourses } from "../../../server/apis/courses";
import Dialog from "./AddEventDialog";
import CoursesInput from "../../formInputs/CoursesInput";
import TitleInput from "../../formInputs/TitleInput";
import DateInput from "../../formInputs/DateInput";
import NotesInput from "../../formInputs/NotesInput";
import { QueryClient } from "@tanstack/react-query";

export default function AddAssignmentDialog() {
  const queryClient = new QueryClient();
  const [exam, formAction] = useFormState(createExam, null);

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
    queryClient.invalidateQueries({
      queryKey: ["exams"],
    });
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
