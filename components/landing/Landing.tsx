import React from "react";
import { MacbookScrollHero } from "./MacbookScrollHero";
import Hero from "./Hero";
import Navbar from "./Navbar";
import ImportFromCanvasFeature from "./ImportFromCanvasFeature";
import PriorityAssignmentsFeature from "./PriorityAssignmentsFeature";
import IntegratedCalendarFeature from "./IntegratedCalendarFeature";
import DashboardFeature from "./DashboardFeature";

export default function Landing() {
  return (
    <>
      <div className="h-screen landing-section flex flex-col">
        <Navbar />
        <Hero />
      </div>
      <ImportFromCanvasFeature />
      <PriorityAssignmentsFeature />
      <IntegratedCalendarFeature />
      <DashboardFeature />
    </>
  );
}
