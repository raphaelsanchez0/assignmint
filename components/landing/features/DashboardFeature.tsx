import React from "react";
import Image from "next/image";
export default function DashboardFeature() {
  return (
    <div className="feature-container md:flex-row flex-col-reverse">
      <div className="feature-visual-container">
        <div className="feature-visual">
          <Image
            src="/images/macbook_img_dark.PNG"
            width={500}
            height={500}
            alt="Demo of Priority Assignments Feature"
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="feature-text-container">
        <h3 className="feature-title">Everything in one place</h3>
        <p className="feature-header">
          Stay on top of everything with a dashboard that shows your assignments
          and exams at a glance.
        </p>
        <div className="feature-bullets-container">
          <div className="feature-bullet-container ">
            <span className="feature-bullet-point"></span>
            <p>All tasks and exams in one view</p>
          </div>
          <div className="feature-bullet-container">
            <span className="feature-bullet-point"></span>
            <p>Events organized by day with "This Week"</p>
          </div>
          <div className="feature-bullet-container">
            <span className="feature-bullet-point"></span>
            <p>Jump to any date instantly</p>
          </div>
        </div>
      </div>
    </div>
  );
}
