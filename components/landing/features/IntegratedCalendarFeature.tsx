import React from "react";
import Image from "next/image";

export default function IntegratedCalendarFeature() {
  return (
    <div className="feature-container md:flex-row flex-col">
      <div className="feature-text-container">
        <h3 className="feature-title">Built-In Calendar to Stay on Track</h3>
        <p className="feature-header">
          AssignMint's built-in calendar makes it simple to manage your
          schedule. View all your assignments and exams in one place with ease.
        </p>
      </div>
      <div className="feature-visual-container">
        <div className="feature-visual">
          <Image
            src="/images/calendar-demo.png"
            width={500}
            height={500}
            alt="Demo of Import Feature Importing Assignmints"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
