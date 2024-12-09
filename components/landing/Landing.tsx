import React from "react";
import { MacbookScrollHero } from "./MacbookScrollHero";
import Hero from "./Hero";
import Navbar from "./Navbar";
import ImportFromCanvasFeature from "./features/ImportFromCanvasFeature";
import PriorityAssignmentsFeature from "./features/PriorityAssignmentsFeature";
import IntegratedCalendarFeature from "./features/IntegratedCalendarFeature";
import DashboardFeature from "./features/DashboardFeature";

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
