"use client"
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getOverdueAssignments } from "@/server/api";
import Assignment from "./Assignment";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export default function OverdueAssignments() {
    const { data, error } = useQuery({
        queryKey: ["overDueAssignments"],
        queryFn: getOverdueAssignments,
    });
    return (
        <>
            {data?.map((assignment) => (
                <Assignment
                    key={assignment.id}
                    title={assignment.title}
                    course={assignment.course.title}
                    due={format(
                        utcToZonedTime(assignment.dueDate, "Etc/UTC"),
                        "MMM d",
                    )}
                    color={assignment.course.color}
                />
            ))}
        </>
    );
}