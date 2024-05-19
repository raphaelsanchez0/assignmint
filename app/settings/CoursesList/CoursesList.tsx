"use client";
import { useState, useEffect } from "react";
import Course from "./Course";
import { getCourses } from "../../../server/apis/courses";
import { v4 as uuidv4 } from "uuid";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddCourseDialog from "./AddCourseDialog";
import LoadingListShorter from "@/components/Loading/LoadingListShorter";
import LoadingCoursesList from "./LoadingCoursesList";
import ErrorCoursesList from "./ErrorCoursesList";

export default function CourseList() {
  const [addCourseDialogOpen, setAddCourseDialogOpen] = useState(false);

  const {
    data: courses,
    isLoading: coursesLoading,
    isError: coursesError,
  } = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: getCourses,
  });
  if (!courses && coursesLoading) return <LoadingCoursesList />;

  if (!courses && coursesError) {
    return <ErrorCoursesList />;
  }

  if (!courses) return null;

  if (courses.length === 0)
    return (
      <Card>
        <div className="flex justify-between items-center mb-2">
          <h3 className="card-title">Courses</h3>\
          <Dialog
            open={addCourseDialogOpen}
            onOpenChange={setAddCourseDialogOpen}
          >
            <DialogTrigger asChild>
              <button className="btn">Add</button>
            </DialogTrigger>
            <AddCourseDialog
              closeDialog={() => setAddCourseDialogOpen(false)}
            />
          </Dialog>
        </div>
        <p className="text-gray-500 dark:text-gray-600 text-sm italic text-center pt-4">
          No courses added yet
        </p>
      </Card>
    );

  return (
    <Card>
      <div className="flex justify-between items-center mb-2">
        <h3 className="card-title">Courses</h3>
        <Dialog
          open={addCourseDialogOpen}
          onOpenChange={setAddCourseDialogOpen}
        >
          <DialogTrigger asChild>
            <button className="btn">Add</button>
          </DialogTrigger>
          <AddCourseDialog closeDialog={() => setAddCourseDialogOpen(false)} />
        </Dialog>
      </div>
      <div>
        {courses.map((course) => (
          <Course courseID={course.id} key={course.id} />
        ))}
      </div>
    </Card>
  );
}
