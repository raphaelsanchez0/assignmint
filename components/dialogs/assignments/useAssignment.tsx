import { getAssignment } from "@/server/apis/assignments";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function useAssignment(assignmentID: string) {
  const {
    data: assignment,
    error: assignmentError,
    isLoading: assignmentLoading,
  } = useQuery<Assignment>({
    queryKey: ["assignment", assignmentID],
    queryFn: () => getAssignment(assignmentID),
  });
  return { assignment, assignmentError, assignmentLoading };
}
