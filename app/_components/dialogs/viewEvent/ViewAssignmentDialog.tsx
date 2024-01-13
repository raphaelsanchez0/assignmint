"use client";
import React, { useEffect, useState } from "react";
import Dialog from "./ViewEventDialog";
import { useSearchParams } from "next/navigation";
import { getAssignment } from "@/server/apis/assignments";
import { useQuery } from "@tanstack/react-query";
import { utcToZonedTime } from "date-fns-tz";
import { format } from "date-fns";

import iconCheckMark from "@/app/_assets/icons/checkmark.svg";
import Image from "next/image";
import DatePicker from "react-datepicker";
import Link from "next/link";

export default function AssignmentDialog() {
  const searchParams = useSearchParams();

  const assignmentId = searchParams.get("assignment");

  const { data, error, isLoading } = useQuery<Assignment>({
    queryKey: ["assignment", assignmentId],
    enabled: assignmentId != null,
    queryFn: () => getAssignment(assignmentId as unknown as number),
  });

  const editAssignmentParams = new URLSearchParams({
    edit: "",
    type: "assignment",
    assignmentId: assignmentId as unknown as string,
  });

  return (
    <div>
      <Dialog
        title="Assignment"
        searchParamKey="assignment"
        redirect="/dashboard"
      >
        <div className="flex justify-between">
          <div className="flex flex-col text-off-black">
            <h2 className="text-3xl font-bold text-off-black">{data?.title}</h2>
            <h3 className="font-semibold text-xl">{data?.course.title}</h3>
          </div>
          <div className="flex flex-col">
            <button className="btn self-end">
              <Link href={`/dashboard?${editAssignmentParams.toString()}`}>
                Edit
              </Link>
            </button>
            <h3 className="text-lg font-medium">
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
        </div>
        <hr className="h-px w-full bg-gray-400 border-0 my-2" />
        {data?.notes ? (
          <>
            <h4 className="font-semibold">Notes</h4>
            <p>{data.notes}</p>
          </>
        ) : (
          <div>No notes</div>
        )}
        <div className="flex justify-center gap-3">
          <button className="btn shadow-xl">
            <Image src={iconCheckMark} alt="Complete Assignment" width={20} />
          </button>
        </div>
      </Dialog>
    </div>
  );

  //if (error) return <div>error</div>;
}
