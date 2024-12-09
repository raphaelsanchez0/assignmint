import React from "react";
import Image from "next/image";
export default function PriorityAssignmentsFeature() {
  return (
    <div className="feature-container md:flex-row flex-col-reverse">
      <div className="feature-visual-container">
        <div className="feature-visual">
          <Image
            src="/images/priority-demo.PNG"
            width={500}
            height={500}
            alt="Demo of Priority Assignments Feature"
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="feature-text-container">
        <h3 className="feature-title">Stay Ahead of Deadlines</h3>
        <p className="feature-header">
          AssignMint helps you prioritize tasks, keeping every deadline in
          sight, no matter how far away.
        </p>
      </div>
    </div>
  );
}
