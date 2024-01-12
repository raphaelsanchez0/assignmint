"use client";
import React, { useEffect, useState } from "react";
import Dialog from "./Dialog";
import { useSearchParams } from "next/navigation";
import { getAssignment } from "@/server/apis/assignments";
import { useQuery } from "@tanstack/react-query";

export default function AssignmentDialog() {
  const [assignment, setAssignment] = useState<Assignment>(null);
  const searchParams = useSearchParams();

  const assignmentId = searchParams.get("assignmentId");

  const { data, error, isLoading, isSuccess } = useQuery<Assignment>({
    queryKey: ["assignment", assignmentId],
    enabled: assignmentId != null,
    queryFn: () => getAssignment(assignmentId as unknown as number),
  });

  useEffect(() => {
    if (isSuccess) {
      setAssignment(data);
    }
  }, [isSuccess]);

  if (data) {
    return (
      <Dialog
        title="Assignment"
        searchParamKey="viewassignment"
        redirect="/dashboard"
      >
        <div className="grid gap-6 mb-6 grid-cols-2 ">
          <h2>{assignment.title}</h2>
          <h3>{assignment.course.title}</h3>
        </div>
      </Dialog>
    );
  }
  if (error) return <div>error</div>;
}
