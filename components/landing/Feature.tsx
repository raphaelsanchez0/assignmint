import { headers } from "next/headers";
import React from "react";

interface FeatureProps {
  title: string;
  header: string;
  bulletPoints: string[];
  visual: React.ReactNode;
}

export default function Feature({
  title,
  header,
  bulletPoints,
  visual,
}: FeatureProps) {
  return (
    <div className="h-screen landing-section landing-feature flex">
      <div className="flex-1 flex flex-col items-start justify-center gap-6 px-8">
        <h3 className="font-medium text-3xl ">{title}</h3>
        <p className="text-lg">{header}</p>
        <div className="text-lg text-gray-600 space-y-3">
          {bulletPoints.map((bulletPoint) => (
            <div className="flex items-center gap-2 ">
              <span className="w-2 h-2 bg-secondary rounded-full"></span>
              <p>{bulletPoint}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">{visual}</div>
    </div>
  );
}
