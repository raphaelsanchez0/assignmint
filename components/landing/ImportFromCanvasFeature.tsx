import React from "react";

export default function ImportFromCanvasFeature() {
  return (
    <div className="h-screen landing-section landing-feature flex">
      {/* Left Content */}
      <div className="flex-1 flex flex-col items-start justify-center gap-6 px-8">
        <h3 className="font-medium text-3xl ">
          Import Your Assignments Seamlessly
        </h3>
        <p className="text-lg">
          AssignMint makes it effortless to sync your assignments from Canvas.
          Our Chrome Extension makes importation a breeze, so you can focus on
          what's important.
        </p>
        <div className="text-lg text-gray-600 space-y-3">
          <div className="flex items-center gap-2 ">
            <span className="w-2 h-2 bg-secondary rounded-full"></span>
            <p>Import all your Canvas assignments in a few clicks.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-secondary rounded-full"></span>
            <p>Select only the assignments you need.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-secondary rounded-full"></span>
            <p>Works with any Canvas-powered platform.</p>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-3/4 h-3/4 bg-gray-200 rounded-lg shadow-md flex items-center justify-center">
          {/* Placeholder for an illustration or screenshot */}
          <p className="text-gray-500 text-center text-lg">
            [Image of AssignMint Chrome Extension in Action]
          </p>
        </div>
      </div>
    </div>
  );
}
