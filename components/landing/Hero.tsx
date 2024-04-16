import React from "react";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import MacWindow from "./MacWindow";

export default function Hero() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full gap-8">
        <h1 className="font-extrabold text-5xl text-center">
          Study Smarter, Not Harder
        </h1>
        <h2 className="text-3xl text-center font-light">
          Streamline your academic life with intuitive tracking, automated
          reminders, and personalized study plans.
        </h2>
        <button
          type="button"
          className="bg-gradient-to-r from-teal-500 to-green-500 rounded-full px-6 py-2 text-white font-semibold shadow-md hover:shadow-lg transition duration-200 ease-in-out
           lg:hidden"
        >
          Sign Up
        </button>
        <MacWindow />
      </div>
    </>
  );
}
