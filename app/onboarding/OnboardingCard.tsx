import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import CourseList from "../settings/CoursesList/CoursesList";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OnboardingCard() {
  const [step, setStep] = useState(1);

  const MIN_STEP = 1;
  const MAX_STEP = 3;

  const inactiveDotStyle = "bg-gray-500 w-2 h-2";
  const activeDotStyle = "dark:bg-gray-100 w-3 h-3 bg-gray-700";

  const router = useRouter();
  function handleNextStep() {
    setStep((prev) => Math.min(prev + 1, MAX_STEP));
    if (step === MAX_STEP) {
      router.push("/dashboard");
    }
  }
  function handlePrevStep() {
    setStep((prev) => Math.max(prev - 1, MIN_STEP));
  }

  return (
    <Card className="w-full p-4 flex flex-col text-center ">
      {step === 1 && (
        <>
          <CardHeader>Welcome to AssignMint!</CardHeader>
          <CardContent>
            <p className="pb-4 text-md font-medium text-muted-foreground">
              Let's start by adding your courses (You can always add or edit
              them)
            </p>
            <CourseList />
          </CardContent>
        </>
      )}
      {step === 2 && (
        <div className="flex flex-col gap-4 justify-center items-center">
          <CardHeader>Get our Chrome Extension</CardHeader>

          <p className="font-medium">
            Our Chrome Extension lets you import your assignments in just a few
            clicks
          </p>

          <div className="feature-visual-container">
            <div className="rounded-lg flex items-center justify-center overflow-hidden shadow-lg">
              <Image
                src="/gifs/importer-demo.gif"
                width={500}
                height={500}
                alt="Demo of Import Feature Importing Assignments"
                className="rounded-lg"
                priority
              />
            </div>
          </div>
          <div className="">
            <div className="btn-action">
              <a
                href="https://chromewebstore.google.com/detail/assignmint-importer/bfhdafafkmognhflmmifjagjcemcegpn?authuser=0&hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                Add to Chrome
              </a>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <>
          <CardHeader>Thank you for joining!</CardHeader>
          <CardContent>
            We are just two people trying to make a better, free, planner, with
            no strings attached. New features are constantly being added, so
            feel free to reach out with any suggestions or feedback! <br />
            <br />
            If you’d like to support us, consider sharing AssignMint with your
            friends or making a donation. Every bit helps us keep improving!
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link
              href="https://buymeacoffee.com/raphaelsanchez"
              target="_blank"
              className="shadow-lg rounded-xl"
            >
              <Image
                src="/images/buy-me-a-coffee.png"
                width={200}
                height={50}
                alt="Buy me a coffee donation link"
                priority
              />
            </Link>
          </CardFooter>
        </>
      )}
      <div className="flex justify-between">
        {step === 1 ? (
          <button className="btn-disabled" onClick={handlePrevStep}>
            <ChevronLeft color="white" />
          </button>
        ) : (
          <button className="btn-action" onClick={handlePrevStep}>
            <ChevronLeft color="white" />
          </button>
        )}

        {/* Incremental dots to show user how many steps are left */}
        <div className="flex gap-3 pt-4">
          <div
            className={`rounded-full transition-all duration-200 ${
              step === 1 ? activeDotStyle : inactiveDotStyle
            }`}
          />
          <div
            className={`rounded-full transition-all duration-200 ${
              step === 2 ? activeDotStyle : inactiveDotStyle
            }`}
          />
          <div
            className={`rounded-full transition-all duration-200 ${
              step === 3 ? activeDotStyle : inactiveDotStyle
            }`}
          />
        </div>

        <button className="btn-action" onClick={handleNextStep}>
          <ChevronRight color="white" />
        </button>
      </div>
    </Card>
  );
}
