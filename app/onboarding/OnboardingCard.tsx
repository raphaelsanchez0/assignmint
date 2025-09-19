import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function OnboardingCard() {
  const [step, setStep] = useState(1);

  const MIN_STEP = 1;
  const MAX_STEP = 3;

  function handleNextStep() {
    setStep((prev) => Math.min(prev + 1, MAX_STEP));
  }
  function handlePrevStep() {
    setStep((prev) => Math.max(prev - 1, MIN_STEP));
  }

  return (
    <Card className="w-full p-4">
      {step === 1 && (
        <>
          <CardHeader>Welcome to Assignmint</CardHeader>
          <CardContent>feffjeklfj</CardContent>
        </>
      )}
      <div className="flex justify-between">
        <button className="btn" onClick={handlePrevStep}>
          <ChevronLeft />
        </button>
        <button className="btn" onClick={handleNextStep}>
          <ChevronRight />
        </button>
      </div>
    </Card>
  );
}
