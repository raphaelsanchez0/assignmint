import LoadingListShorter from "@/components/Loading/LoadingListShorter";
import React, { Suspense } from "react";
import ChangePasswordForm from "./ChangePasswordForm";
import LoadingCard from "@/components/Loading/LoadingCard";

export default function ChangePasswordCard() {
  return (
    <Suspense fallback={<LoadingCard />}>
      <ChangePasswordForm />
    </Suspense>
  );
}
