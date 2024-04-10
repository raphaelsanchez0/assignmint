import React from "react";
import { TextGenerateEffect } from "../ui/text-generate-effect";

export default function Hero() {
  return (
    <>
      <div className="flex flex-col grow items-center justify-center">
        <h1 className="font-bold text-5xl">Study Smarter, Not Harder</h1>
        <h2 className="text-3xl text-center">
          Streamline your academic life with intuitive tracking, automated
          reminders, and personalized study plans.
        </h2>
      </div>
      <div className="h-2"></div>
    </>
  );
}
