"use client";
import LoadingListShorter from "@/components/Loading/LoadingListShorter";
import { Suspense } from "react";
import OnboardingCard from "./OnboardingCard";

export default function Onboarding() {
  return (
    <Suspense fallback={<LoadingListShorter />}>
      <OnboardingCard />
    </Suspense>
  );
}
