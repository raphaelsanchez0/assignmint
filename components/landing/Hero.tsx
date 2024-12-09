import React from "react";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import MacWindow from "./MacWindow";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full gap-8">
        <h2 className="font-extrabold text-5xl text-center">
          Study Smarter, Not Harder
        </h2>
        <h1 className="text-3xl text-center font-light">
          The Assignment Tracker that Just Makes Sense
        </h1>
        <Link href="/login">
          <button
            type="button"
            className="bg-gradient-to-r from-teal-500 to-green-500 rounded-full px-6 py-2 text-white font-semibold shadow-md hover:shadow-lg transition duration-200 ease-in-out
           lg:hidden"
          >
            Sign Up
          </button>
        </Link>
        <MacWindow />
      </div>
    </>
  );
}
