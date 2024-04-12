import React from "react";
import { TextGenerateEffect } from "../ui/text-generate-effect";

export default function Hero() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="font-extrabold text-5xl text-center ">
          Study Smarter, Not Harder
        </h1>
        <h2 className="text-3xl text-center font-light mt-6">
          Streamline your academic life with intuitive tracking, automated
          reminders, and personalized study plans.
        </h2>
      </div>
    </>
  );
}
