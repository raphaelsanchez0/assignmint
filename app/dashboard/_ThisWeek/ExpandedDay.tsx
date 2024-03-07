import Exam from "@/components/ExamsList/Exam";
import React from "react";
import Assignment from "@/components/AssignmentsList/Assignment";

interface ExpandedDayProps {
  exams: Exam[];
  assignments: Assignment[];
}

const ExpandedDay: React.FC<ExpandedDayProps> = ({ exams, assignments }) => {
  return (
    <>
      {exams?.length !== undefined && exams?.length > 0 && (
        <>
          <h4 className="font-semibold my-1 text-lg">Exams</h4>
          <ol>{exams?.map((exam) => <Exam key={exam.id} exam={exam} />)}</ol>
        </>
      )}
      {assignments?.length !== undefined && assignments?.length > 0 && (
        <>
          <h4 className="font-semibold my-1 text-lg">Assignments</h4>
          <ol>
            {assignments?.map((assignment) => (
              <Assignment key={assignment.id} assignment={assignment} />
            ))}
          </ol>
        </>
      )}
    </>
  );
};

export default ExpandedDay;
