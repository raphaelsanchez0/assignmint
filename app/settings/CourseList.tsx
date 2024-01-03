import React from "react";
import Link from "next/link";
import Course from "./Course";

export default function CourseList() {
    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h3 className="card-title">Courses</h3>
                <Link href="/settings?addcourse=y">
                    <button className="btn">Add</button>
                </Link>
            </div>
            <div>
                <Course name={"CS1114"} color="red" />
            </div>
        </>
    );
}
