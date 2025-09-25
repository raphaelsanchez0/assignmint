import React, { useEffect } from "react";
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
  displayHeader?: boolean;
  noAssignmentsText?: string;
}

const GenericAssignments: React.FC<GenericAssignmentsProps> = ({
  fetchAssignmentsFn,
  queryKey,
  title,
  color,
  displayHeader = true,
  noAssignmentsText = "",
}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["assignments", { queryKey }],
    queryFn: fetchAssignmentsFn,
  });

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <p>Error loading assignments</p>;
  if (data?.length === 0) {
    if (noAssignmentsText === "") return null;
    else {
      return (
        <p className="text-gray-500 dark:text-gray-600 text-sm italic text-center pt-4">
          {noAssignmentsText}
        </p>
      );
    }
  }

  return (
    <>
      {displayHeader && <SectionDivider title={title} color={color} />}
      {data?.map((assignment) => (
        <Assignment key={assignment.id} assignment={assignment} />
      ))}
    </>
  );
};
export default GenericAssignments;
