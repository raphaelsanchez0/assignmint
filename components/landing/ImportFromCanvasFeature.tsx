import React from "react";
import Image from "next/image";

export default function ImportFromCanvasFeature() {
  return (
    <div className="h-screen landing-section landing-feature flex">
      <div className="feature-text-container">
        <h3 className="feature-title">Import Your Assignments Seamlessly</h3>
        <p className="feature-header">
          AssignMint makes it effortless to sync your assignments from Canvas.
          Our Chrome Extension makes importation a breeze, so you can focus on
          what's important.
        </p>
        <div className="feature-bullets-container">
          <div className="feature-bullet-container ">
            <span className="feature-bullet-point"></span>
            <p>Import all your Canvas assignments in a few clicks</p>
          </div>
          <div className="feature-bullet-container">
            <span className="feature-bullet-point"></span>
            <p>Select only the assignments you need</p>
          </div>
          <div className="feature-bullet-container">
            <span className="feature-bullet-point"></span>
            <p>Works with any Canvas-powered platform</p>
          </div>
        </div>
      </div>

      <div className="feature-visual-container">
        <div className="feature-visual">
          <Image
            src="/gifs/importer-demo.gif"
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
