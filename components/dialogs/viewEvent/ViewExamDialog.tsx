"use client";
import { getExam } from "@/server/apis/exams";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function ViewExamDialog() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const examId = searchParams.get("exam");
  const { data, error, isLoading } = useQuery<Assignment>({
    queryKey: ["exam", examId],
    enabled: examId != null,
    queryFn: () => getExam(examId as unknown as number),
  });
  return <div>ViewExamDialog</div>;
}
