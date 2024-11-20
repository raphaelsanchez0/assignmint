("");
import { Card } from "../ui/card";
import AddAssignmentDialog from "@/components/dialogs/assignments/AddAssignmentDialog";
import FutureAssignments from "./AssignmentCatagories/FutureAssignments";
import AssignmentCategories from "./AssignmentCatagories";

interface AssignmentsListProps {
  showAddAssignment?: boolean;
  cardTitle?: string;
  isInteractive?: boolean;
}

const AssignmentsList: React.FC<AssignmentsListProps> = async ({
  showAddAssignment = false,
  cardTitle = "Assignments",
  isInteractive = true,
}) => {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h3 className="card-title">{cardTitle}</h3>
        {showAddAssignment && (
          <div>
            <AddAssignmentDialog />
          </div>
        )}
      </div>
      <AssignmentCategories isInteractive={isInteractive} />
    </Card>
  );
};

export default AssignmentsList;
