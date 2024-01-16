"use client";
import { getCourses } from "@/server/apis/courses";
import { getExam } from "@/server/apis/exams";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import EditEventDialog from "./EditEventDialog";
import CoursesInput from "@/components/formInputs/CoursesInput";
import TitleInput from "@/components/formInputs/TitleInput";
import DateInput from "@/components/formInputs/DateInput";
import { utcToZonedTime } from "date-fns-tz";
import NotesInput from "@/components/formInputs/NotesInput";
import { updateExam } from "@/server/actions";

export default function EditExamDialog() {
  const [assignment, formAction] = useFormState(updateExam, null);
  const [courses, setCourses] = useState<CourseType[]>([]);
  const searchParams = useSearchParams();
  const examId = searchParams.get("exam");

  const { data, error, isLoading } = useQuery<Exam>({
    queryKey: ["exam", examId],
    enabled: examId != null,
    queryFn: () => getExam(examId as unknown as number),
  });
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
    <EditEventDialog title="Edit Exam" searchParamKey="edit" type="exam">
      <form action={formAction}>
        <div className="grid gap-6 mb-6 grid-cols-2 ">
          <div className="assignment--input-container">
            <CoursesInput
              courses={courses}
              edit
              currentCourse={{
                value: data?.course?.id || "",
                label: data?.course?.title || "",
              }}
            />
          </div>
          <div>
            <TitleInput edit currentTitle={data?.title} />
          </div>
          <div>
            <DateInput
              type="exam"
              edit
              currentDate={
                data?.examDate
                  ? new Date(utcToZonedTime(data.examDate, "Etc/UTC"))
                  : new Date()
              }
            />
          </div>
          <div className="col-span-2">
            <NotesInput edit currentNotes={data?.notes} />
          </div>
          <input type="hidden" name="id" value={data?.id} />
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="btn shadow-lg"
              onClick={closeDialog}
            >
              Update Assignment
            </button>
          </div>
        </div>
      </form>
    </EditEventDialog>
  );
}
