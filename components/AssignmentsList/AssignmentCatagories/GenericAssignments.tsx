import React from "react";
import { useQuery } from "@tanstack/react-query";
import Assignment from "../Assignment";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import SectionDivider from "./SectionDivider";
import LoadingSkeleton from "../../Loading/LoadingListShorter";

interface GenericAssignmentsProps {
  fetchAssignmentsFn: () => Promise<any[]>;
  title: string;
  queryKey: string;
  color: string;
}

const GenericAssignments: React.FC<GenericAssignmentsProps> = ({
  fetchAssignmentsFn,
  queryKey,
  title,
  color,
}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["assignments", { queryKey }],
    queryFn: fetchAssignmentsFn,
  });

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <p>Error loading assignments</p>;
  if (data?.length === 0) {
    return null;
  }

  return (
    <>
      <SectionDivider title={title} color={color} />
      {data?.map((assignment) => (
        <Assignment
          key={assignment.id}
          id={assignment.id}
          title={assignment.title}
          course={assignment.course.title}
          due={format(utcToZonedTime(assignment.dueDate, "Etc/UTC"), "MMM d")}
          color={assignment.course.color}
        />
      ))}
    </>
  );
};
export default GenericAssignments;
