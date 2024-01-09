import Link from "next/link";
import Assignment from "./Assignment";
import SectionDivider from "./SectionDivider";

import { useEffect, useState } from "react";
import {
    HydrationBoundary,
    QueryClient,
    useQuery,
    dehydrate,
} from "@tanstack/react-query";
import { getOverdueAssignments } from "@/server/api";
import { utcToZonedTime } from "date-fns-tz";
import { format } from "date-fns";
import OverdueAssignments from "./OverdueAssignments";
import AddAssignment from "@/app/assignments/_AddAssignment/AddAssignment";
import AddAssignmentBtn from "./AddAssignmentBtn";

interface AssignmentsListProps {
    showAddAssignment?: boolean;
}
interface CategorizedAssignments {
    category: string;
    assignments: Assignment[];
}

const AssignmentsList: React.FC<AssignmentsListProps> = async ({
    showAddAssignment = false,
}) => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["overDueAssignments"],
        queryFn: getOverdueAssignments,
    });

    // const currentDateIso = new Date().toISOString();
    // const priority = data.filter((a) => a.priority);
    // const overdue = data.filter(
    //     (a) => new Date(a.dueDate) < new Date(currentDateIso),
    // );
    // const dueToday = data.filter((a) => a.dueDate === currentDateIso);
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h3 className="card-title">Assignments</h3>
                {showAddAssignment && <AddAssignmentBtn />}
            </div>
            <ol>
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <OverdueAssignments />
                </HydrationBoundary>

                <SectionDivider title="Priority" color="#F4BD6B" />
                {/* {priority.map((assignment) => (
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
                ))} */}
                <SectionDivider title="Due Today" color="#7DC672" />
                {/* {dueToday.map((assignment) => (
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
                ))} */}
            </ol>
        </div>
    );
};

export default AssignmentsList;
