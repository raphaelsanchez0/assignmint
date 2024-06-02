import LoadingListShorter from "@/components/Loading/LoadingListShorter";
import React, { Suspense } from "react";
import ResetPasswordCard from "./ResetPasswordCard";

export default function page() {
  return (
    <Suspense fallback={<LoadingListShorter />}>
      <ResetPasswordCard />
    </Suspense>
  );
}
