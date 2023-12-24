import Assignment from "../_components/AssignmentsList/Assignment";
import SectionDivider from "../_components/AssignmentsList/SectionDivider";

interface AssignmentsListProps {
    date: Date;
}

const AssignmentsList: React.FC<AssignmentsListProps> = ({ date }) => {

    const formatedDate = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h3 className="card-title">{formatedDate}</h3>
            </div>
            <div>
                <SectionDivider title="Overdue" color="#FC7C7C" />
                <Assignment name="Pogram 10" course="CS 1114"
                    due="Nov 12" color="#DB5F5F" />
                <Assignment name="Reading 2" course="ITDS 2064"
                    due="Nov 12" color="#EFEA6A" />
                <Assignment name="Essay 3" course="ENGL 2122"
                    due="Nov 12" color="#5F89DB" />
                <SectionDivider title="Priority" color="#F4BD6B" />
                <Assignment name="Pogram 10" course="CS 1114"
                    due="Nov 12" color="#DB5F5F" />
                <Assignment name="Essay 3" course="ENGL 2122"
                    due="Nov 12" color="#5F89DB" />
                <SectionDivider title="Due Today" color="#7DC672" />
                <Assignment name="Essay 3" course="ENGL 2122"
                    due="Nov 12" color="#5F89DB" />
                <SectionDivider title="Priority" color="#F4BD6B" />
                <Assignment name="Pogram 10" course="CS 1114"
                    due="Nov 12" color="#DB5F5F" />
                <Assignment name="Essay 3" course="ENGL 2122"
                    due="Nov 12" color="#5F89DB" />
                <SectionDivider title="Due Today" color="#7DC672" />
                <Assignment name="Essay 3" course="ENGL 2122"
                    due="Nov 12" color="#5F89DB" />
            </div>

        </div>
    )
}

export default AssignmentsList;