"use client";

import Link from "next/link";
import Assignment from "./Assignment";
import SectionDivider from "./SectionDivider";

import { useState } from "react";

interface AssignmentsListProps {
    showAddAssignment?: boolean;
}

const AssignmentsList: React.FC<AssignmentsListProps> = ({
    showAddAssignment = false,
}) => {
    const [assignments, setAssignments] = useState([
        {
            name: "Pogram 10",
            course: "CS 1114",
            dueDate: "Nov 12",
            color: "#DB5F5F",
            category: "overdue",
        },
        {
            name: "Reading 2",
            course: "ITDS 2064",
            dueDate: "Nov 12",
            color: "#EFEA6A",
            category: "overdue",
        },
        {
            name: "Essay 3",
            course: "ENGL 2122",
            dueDate: "Nov 12",
            color: "#5F89DB",
            category: "overdue",
        },
        {
            name: "Pogram 10",
            course: "CS 1114",
            dueDate: "Nov 12",
            color: "#DB5F5F",
            category: "priority",
        },
        {
            name: "Essay 3",
            course: "ENGL 2122",
            dueDate: "Nov 12",
            color: "#5F89DB",
            category: "priority",
        },
        {
            name: "Essay 3",
            course: "ENGL 2122",
            dueDate: "Nov 12",
            color: "#5F89DB",
            category: "due today",
        },
        {
            name: "Pogram 10",
            course: "CS 1114",
            dueDate: "Nov 12",
            color: "#DB5F5F",
            category: "priority",
        },
        {
            name: "Essay 3",
            course: "ENGL 2122",
            dueDate: "Nov 12",
            color: "#5F89DB",
            category: "priority",
        },
        {
            name: "Essay 3",
            course: "ENGL 2122",
            dueDate: "Nov 12",
            color: "#5F89DB",
            category: "due today",
        },
    ]);

    const [overdueAssignments, setOverdueAssignments] = useState(
        assignments.filter((assignment) => assignment.category === "overdue"),
    );
    const [priorityAssignments, setPriorityAssignments] = useState(
        assignments.filter((assignment) => assignment.category === "priority"),
    );
    const [dueTodayAssignments, setDueTodayAssignments] = useState(
        assignments.filter((assignment) => assignment.category === "due today"),
    );

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h3 className="card-title">Assignments</h3>
                {showAddAssignment && (
                    <Link href="/dashboard?addassignment=y">
                        <button className="btn">Add</button>
                    </Link>
                )}
            </div>
            <ol>
                <SectionDivider title="Overdue" color="#FC7C7C" />

                {overdueAssignments.map((assignment) => (
                    <Assignment
                        key={assignment.name}
                        name={assignment.name}
                        course={assignment.course}
                        due={assignment.dueDate}
                        color={assignment.color}
                    />
                ))}

                <SectionDivider title="Priority" color="#F4BD6B" />
                {priorityAssignments.map((assignment) => (
                    <Assignment
                        key={assignment.name}
                        name={assignment.name}
                        course={assignment.course}
                        due={assignment.dueDate}
                        color={assignment.color}
                    />
                ))}
                <SectionDivider title="Due Today" color="#7DC672" />
                {dueTodayAssignments.map((assignment) => (
                    <Assignment
                        key={assignment.name}
                        name={assignment.name}
                        course={assignment.course}
                        due={assignment.dueDate}
                        color={assignment.color}
                    />
                ))}
            </ol>
        </div>
    );
};

export default AssignmentsList;
