"use client";
import { useState, useEffect } from "react";
import Course from "./Course";
import { getCourses } from "../../../server/apis/courses";
import { v4 as uuidv4 } from "uuid";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function CourseList() {
  //const [courses, setCourses] = useState<Course[]>([]);

  const [linkDialogOpen, setLinkDialogOpen] = useState(false);

  const { data: courses, isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  // const addCourse = () => {
  //   const newCourse = {
  //     id: uuidv4(),
  //     title: "New Course",
  //     color: "#000000",
  //   };
  //   setCourses([...courses, newCourse]);
  // };

  //Change Later
  if (!courses) return null;

  return (
    <Card>
      <div className="flex justify-between items-center mb-2">
        <h3 className="card-title">Courses</h3>
        <Dialog>
          <DialogTrigger asChild>
            <button className="btn">Add</button>
          </DialogTrigger>
          <DialogContent>test</DialogContent>
        </Dialog>
      </div>
      <div>
        {courses.map((course) => (
          <Course
            courseID={course.id}
            key={course.id}
            setCourses={() => {}}
            openLinkDialogFn={() => setLinkDialogOpen(true)}
          />
        ))}
      </div>
    </Card>
  );
}
