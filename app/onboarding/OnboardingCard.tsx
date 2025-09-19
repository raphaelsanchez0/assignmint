import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function OnboardingCard() {
  const [step, setStep] = useState(1);

  const MIN_STEP = 1;
  const MAX_STEP = 4;

  function handleNextStep() {
    setStep((prev) => Math.min(prev + 1, MAX_STEP));
    if (step === 3) {
      alert("maybe have the chrome extension pop up here? not sure how to do that");
    }
  }
  function handlePrevStep() {
    setStep((prev) => Math.max(prev - 1, MIN_STEP));
  }

  return (
    <Card className="w-full p-4 flex flex-col text-center">
      {step === 1 && (
        <>
          <CardHeader>Welcome to Assignmint!</CardHeader>
          {/* <CardContent>feffjeklfj</CardContent> */}
        </>
      )}
      {step === 2 && (
        <>
          <CardHeader>Make some courses</CardHeader>
          <CardContent>video embed here</CardContent>
        </>
      )}
      {step === 3 && (
        <>
          <CardHeader>Get the Extension!</CardHeader>
          <CardContent>
            <div className="font-bold text-blue-600 underline hover:text-blue-800">
              <a
                href="https://chromewebstore.google.com/detail/assignmint-importer/bfhdafafkmognhflmmifjagjcemcegpn?authuser=0&hl=en"
                target="_blank"
                rel="noopener noreferrer">
                Add to Chrome
              </a>
            </div>
          </CardContent>
        </>
      )}
      {step === 4 && (
        <>
          <CardHeader>Thank you for joining!</CardHeader>
          <CardContent>We are just two people, if you want to donate for server costs, pls do here</CardContent>
        </>
      )}
      <div className="flex justify-between">
        <button className="btn" onClick={handlePrevStep}>
          <ChevronLeft />
        </button>
        {/* Incremental dots to show user how many steps are left */}
        <div className="flex gap-3">
          <div
            className={`rounded-full transition-all duration-200 ${step === 1 ? "w-3 h-3 bg-gray-500" : "w-2 h-2 bg-gray-100"
              }`}
          />
          <div
            className={`rounded-full transition-all duration-200 ${step === 2 ? "w-3 h-3 bg-gray-500" : "w-2 h-2 bg-gray-100"
              }`}
          />
          <div
            className={`rounded-full transition-all duration-200 ${step === 3 ? "w-3 h-3 bg-gray-500" : "w-2 h-2 bg-gray-100"
              }`}
          />
          <div
            className={`rounded-full transition-all duration-200 ${step === 4 ? "w-3 h-3 bg-gray-500" : "w-2 h-2 bg-gray-100"
              }`}
          />
        </div>

        <button className="btn" onClick={handleNextStep}>
          <ChevronRight />
        </button>
      </div>
    </Card>
  );
}
