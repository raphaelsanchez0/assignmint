import React from "react";
import { Separator } from "../ui/separator";
import Image from "next/image";

export default function Features() {
  return (
    <div className="landing-section flex flex-col md:flex-row md:justify-around md items-center gap-4">
      <div className="flex flex-col items-center ">
        <h5 className="font-medium">Never Miss Assignments</h5>

        <p className="text-center font-light">
          With everything visible at a glance, you'll always know whats coming
          up
        </p>
      </div>
      <Separator className="hide-when-desktop" />
      <div className="">feature 2</div>
      <Separator className="hide-when-desktop" />
      <div className="">feature 3</div>
    </div>
  );
}
