"use client";
import { useState, useEffect } from "react";
import Course from "./Course";
import { getCourses } from "../_server/api";
import { v4 as uuidv4 } from "uuid";

export const revalidate = 0;

export default function CourseList() {
    const [courses, setCourses] = useState<Course[]>([]);
    useEffect(() => {
        const fetchCourses = async () => {
            const coursesFromServer = await getCourses();
            setCourses(coursesFromServer);
        };

        fetchCourses();
    }, []);

    const addCourse = () => {
        const newCourse = {
            id: uuidv4(),
            title: "New Course",
            color: "#000000",
        };
        setCourses([...courses, newCourse]);
    };

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h3 className="card-title">Courses</h3>

                <button className="btn" onClick={addCourse}>
                    Add
                </button>
            </div>
            <div>
                {courses.map((course) => (
                    <Course
                        name={course.title}
                        color={course.color}
                        key={course.id}
                        id={course.id}
                        setCourses={setCourses}
                    />
                ))}
            </div>
        </>
    );
}
