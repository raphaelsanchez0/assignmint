import SectionDivider from "./AssignmentCatagories/SectionDivider";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import {
  getDueTodayAssignments,
  getOverdueAssignments,
  getPriorityAssignments,
} from "@/server/apis/assignments";
import OverdueAssignments from "./AssignmentCatagories/OverdueAssignments";
import AddAssignmentBtn from "./AddAssignmentBtn";
import PriorityAssignments from "./AssignmentCatagories/PriorityAssignments";
import DueTodayAssignments from "./AssignmentCatagories/DueTodayAssignments";
import DueTomorrowAssignments from "./AssignmentCatagories/DueTomorrowAssignments";
import ThisWeekAssignments from "./AssignmentCatagories/ThisWeekAssignments";
import NextWeekAssignments from "./AssignmentCatagories/NextWeekAssignments";
import { Card } from "../ui/card";
import AddAssignmentDialog from "../event-dialogs/assignments/AddAssignmentDialog";

interface AssignmentsListProps {
  showAddAssignment?: boolean;
}

const AssignmentsList: React.FC<AssignmentsListProps> = async ({
  showAddAssignment = false,
}) => {
  const queryClient = new QueryClient();

  return (
    <Card>
      {/* // <div> */}
      <div className="flex items-center justify-between">
        <h3 className="card-title">Assignments</h3>
        {showAddAssignment && (
          <div>
            <AddAssignmentDialog />
          </div>
        )}
      </div>

      <ol>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <OverdueAssignments />
        </HydrationBoundary>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <PriorityAssignments />
        </HydrationBoundary>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <DueTodayAssignments />
        </HydrationBoundary>
        <HydrationBoundary>
          <DueTomorrowAssignments />
        </HydrationBoundary>
        <HydrationBoundary>
          <ThisWeekAssignments />
        </HydrationBoundary>
        <HydrationBoundary>
          <NextWeekAssignments />
        </HydrationBoundary>
      </ol>
      {/* </div> */}
    </Card>
  );
};

export default AssignmentsList;
