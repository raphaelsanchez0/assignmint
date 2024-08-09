import React from "react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { Card } from "../ui/card";

export default function Features() {
  return (
    <div className="landing-section flex flex-col md:flex-row md:justify-around md items-start gap-4 mb-10">
      <Card className="flex flex-col items-center gap-2 flex-1">
        <h5 className="font-medium">Never Miss Assignments</h5>
        <p className="text-center font-light px-4">
          With everything visible at a glance, you&apos;ll always know whats
          coming up
        </p>
        <Image
          src={"/illustrations/checklist.png"}
          alt="Illustration of a person marking items off a checklist"
          width={200}
          height={200}
          className="dark:hidden"
        />
      </Card>
      <Separator className="hide-when-desktop" />
      <Card className="flex flex-col items-center gap-2 flex-1">
        <h5 className="font-medium">Keep track of whats Important</h5>
        <p className="text-center font-light px-4">
          With priority assignments and exams, you&apos;ll never let the
          important things slip through the cracks.
        </p>
        <Image
          src={"/illustrations/thumbs-up.png"}
          alt="Illustration of a person working on a laptop with a thumbs up"
          width={200}
          height={200}
          className="dark:hidden"
        />
      </Card>
      <Separator className="hide-when-desktop" />
      <Card className="flex flex-col items-center gap-2 flex-1">
        <h5 className="font-medium">Master your time</h5>
        <p className="text-center font-light px-4">
          Use our integrated calendar to stay on top of your schedule and get
          the bigger picture.
        </p>
        <Image
          src={"/illustrations/stats.png"}
          alt="Illustration of a person looking at statistics"
          width={200}
          height={200}
          className="dark:hidden"
        />
      </Card>
    </div>
  );
}
