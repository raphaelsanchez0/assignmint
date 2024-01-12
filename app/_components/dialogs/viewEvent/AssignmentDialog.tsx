"use client";
import React, { useEffect, useState } from "react";
import Dialog from "./ViewEventDialog";
import { useSearchParams } from "next/navigation";
import { getAssignment } from "@/server/apis/assignments";
import { useQuery } from "@tanstack/react-query";
import { utcToZonedTime } from "date-fns-tz";
import { format } from "date-fns";

export default function AssignmentDialog() {
  const [assignment, setAssignment] = useState<Assignment>();
  const searchParams = useSearchParams();

  const assignmentId = searchParams.get("assignment");

  const { data, error, isLoading, isSuccess } = useQuery<Assignment>({
    queryKey: ["assignment", assignmentId],
    enabled: assignmentId != null,
    queryFn: () => getAssignment(assignmentId as unknown as number),
  });

  if (isLoading) return null;

  return (
    <div>
      <Dialog
        title="Assignment"
        searchParamKey="assignment"
        redirect="/dashboard"
      >
        <div className="grid gap-6 mb-6 grid-cols-2 ">
          <div className="assignment--input-container flex flex-col">
            <h2 className="text-2xl font-bold">{data?.title}</h2>
            <h3 className="font-semibold">{data?.course.title}</h3>
            <h3 className="">
              {`Due 
              ${
                data?.dueDate
                  ? format(
                      utcToZonedTime(data.dueDate, "Etc/UTC"),
                      "EEE MMMM d, YYY",
                    )
                  : null
              }`}
            </h3>
          </div>
          <div></div>
          <div></div>
          <div>
            <h1>{data?.priority}</h1>
          </div>
          <div className="col-span-2">
            <h1>{data?.notes}</h1>
          </div>
        </div>
      </Dialog>
    </div>
  );

  //if (error) return <div>error</div>;
}
