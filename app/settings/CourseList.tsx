"use client";
import { useState } from "react";
import Link from "next/link";
import Course from "./Course";

export default function CourseList() {
    const [courses, setCourses] = useState<Course[]>([]);

    const addCourse = () => {
        const newCourse = {
            title: "New Course",
            color: "#000000",
        };
        setCourses([...courses, newCourse]);
    };

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h3 className="card-title">Courses</h3>
                <Link href="/settings?addcourse=y">
                    <button className="btn" onClick={addCourse}>
                        Add
                    </button>
                </Link>
            </div>
            <div>
                {courses.map((course) => (
                    <Course name={course.title} color={course.color} />
                ))}
            </div>
        </>
    );
}
