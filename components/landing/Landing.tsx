import React from "react";
import { MacbookScrollHero } from "./MacbookScrollHero";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Features from "./Features";

export default function Landing() {
  return (
    <>
      <div className="h-screen landing-section flex flex-col">
        <Navbar />
        <Hero />
      </div>
      <Features />
    </>
  );
}
