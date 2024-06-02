import LoadingListShorter from "@/components/Loading/LoadingListShorter";
import React, { Suspense } from "react";
import ChangePasswordForm from "./ChangePasswordForm";

export default function page() {
  return (
    <Suspense fallback={<LoadingListShorter />}>
      <ChangePasswordForm />
    </Suspense>
  );
}
