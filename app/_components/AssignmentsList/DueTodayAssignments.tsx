"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getDueTodayAssignments, getOverdueAssignments } from "@/server/api";
import Assignment from "./Assignment";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import SectionDivider from "./SectionDivider";

export default function DueTodayAssignments() {
    const { data, error } = useQuery({
        queryKey: ["dueTodayAssignments"],
        queryFn: getDueTodayAssignments,
    });

    if (data?.length === 0) {
        return null;
    }
    return (
        <>
            <SectionDivider title="Due Today" color="#7DC672" />
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
