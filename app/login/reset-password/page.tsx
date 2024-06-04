import LoadingListShorter from "@/components/Loading/LoadingListShorter";
import React, { Suspense } from "react";
import ResetPasswordCard from "./ResetPasswordCard";
import LoadingCard from "@/components/Loading/LoadingCard";

export default function page() {
  return (
    <Suspense fallback={<LoadingCard />}>
      <ResetPasswordCard />
    </Suspense>
  );
}
