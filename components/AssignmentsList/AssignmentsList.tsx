import SectionDivider from "./AssignmentCatagories/SectionDivider";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  useQuery,
} from "@tanstack/react-query";
import { hasAssignments } from "@/server/apis/assignments";
import OverdueAssignments from "./AssignmentCatagories/OverdueAssignments";
import AddAssignmentBtn from "./AddAssignmentBtn";
import PriorityAssignments from "./AssignmentCatagories/PriorityAssignments";
import DueTodayAssignments from "./AssignmentCatagories/DueTodayAssignments";
import DueTomorrowAssignments from "./AssignmentCatagories/DueTomorrowAssignments";
import ThisWeekAssignments from "./AssignmentCatagories/ThisWeekAssignments";
import NextWeekAssignments from "./AssignmentCatagories/NextWeekAssignments";
import { Card } from "../ui/card";
import AddAssignmentDialog from "@/components/dialogs/assignments/AddAssignmentDialog";
import FutureAssignments from "./AssignmentCatagories/FutureAssignments";
import AssignmentCatagories from "./AssignmentCatagories";

interface AssignmentsListProps {
  showAddAssignment?: boolean;
}

const AssignmentsList: React.FC<AssignmentsListProps> = async ({
  showAddAssignment = false,
}) => {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h3 className="card-title">Assignments</h3>
        {showAddAssignment && (
          <div>
            <AddAssignmentDialog />
          </div>
        )}
      </div>
      <AssignmentCatagories />
    </Card>
  );
};

export default AssignmentsList;
