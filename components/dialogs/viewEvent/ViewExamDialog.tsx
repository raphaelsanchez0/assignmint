"use client";
import Dialog from "./ViewEventDialog";
import { deleteExam, getExam } from "@/server/apis/exams";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import iconCheckMark from "@/public/icons/checkmark.svg";
import LoadingListShorter from "@/components/Loading/LoadingListShorter";

export default function ViewExamDialog() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const examId = searchParams.get("exam");
  const { data, error, isLoading } = useQuery<Exam>({
    queryKey: ["exam", examId],
    enabled: examId != null,
    queryFn: () => getExam(examId as unknown as number),
  });

  const editExamParams = new URLSearchParams({
    edit: "",
    exam: examId as unknown as string,
  });

  if (isLoading)
    return (
      <>
        <Dialog title="Exam" searchParamKey="exam" redirect="/dashboard">
          <LoadingListShorter />
        </Dialog>
      </>
    );

  function handleDeleteExam() {
    deleteExam(examId as unknown as number).then(() => {
      window.location.href = "/dashboard";
    });
  }

  return (
    <div>
      <Dialog title="Exam" searchParamKey="exam" redirect="/dashboard">
        <div className="flex justify-between">
          <div className="flex flex-col text-off-black">
            <h2 className="text-3xl font-bold text-off-black">{data?.title}</h2>
            <h3 className="font-semibold text-xl">{data?.course.title}</h3>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href={`/dashboard?${editExamParams.toString()}`}
              className="self-end"
            >
              <button className="btn ">Edit</button>
            </Link>
            <h3 className="text-lg font-medium">
              {`Due 
              ${
                data?.examDate
                  ? format(
                      utcToZonedTime(data.examDate, "Etc/UTC"),
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
          <button className="btn shadow-xl" onClick={handleDeleteExam}>
            <Image src={iconCheckMark} alt="Complete Exam" width={20} />
          </button>
        </div>
      </Dialog>
    </div>
  );
}
