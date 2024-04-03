"use client";
import { useState, useEffect } from "react";
import Course from "./Course";
import { getCourses } from "../../server/apis/courses";
import { v4 as uuidv4 } from "uuid";
import { Card } from "@/components/ui/card";
import LinkCoursesDialog from "@/components/dialogs/courses/LinkCoursesDialog";
import { useQuery } from "@tanstack/react-query";

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);

  const [linkDialogOpen, setLinkDialogOpen] = useState(false);

  const { data } = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  useEffect(() => {
    if (data) {
      setCourses(data);
    }
  }, [data]);

  const addCourse = () => {
    const newCourse = {
      id: uuidv4(),
      title: "New Course",
      color: "#000000",
    };
    setCourses([...courses, newCourse]);
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-2">
        <h3 className="card-title">Courses</h3>

        <button className="btn" onClick={addCourse}>
          Add
        </button>
      </div>
      <div>
        {courses.map((course) => (
          <Course
            course={course}
            key={course.id}
            setCourses={setCourses}
            openLinkDialogFn={() => setLinkDialogOpen(true)}
          />
        ))}
      </div>
    </Card>
  );
}
