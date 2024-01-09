import SectionDivider from "./SectionDivider";
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query";
import {
    getDueTodayAssignments,
    getOverdueAssignments,
    getPriorityAssignments,
} from "@/server/api";
import OverdueAssignments from "./OverdueAssignments";
import AddAssignmentBtn from "./AddAssignmentBtn";
import PriorityAssignments from "./PriorityAssignments";
import DueTodayAssignments from "./DueTodayAssignments";

interface AssignmentsListProps {
    showAddAssignment?: boolean;
}

const AssignmentsList: React.FC<AssignmentsListProps> = async ({
    showAddAssignment = false,
}) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["overDueAssignments"],
        queryFn: getOverdueAssignments,
    });

    await queryClient.prefetchQuery({
        queryKey: ["priorityAssignments"],
        queryFn: getPriorityAssignments,
    });

    await queryClient.prefetchQuery({
        queryKey: ["dueTodayAssignments"],
        queryFn: getDueTodayAssignments,
    });

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
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <PriorityAssignments />
                </HydrationBoundary>{" "}
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <DueTodayAssignments />
                </HydrationBoundary>
            </ol>
        </div>
    );
};

export default AssignmentsList;
