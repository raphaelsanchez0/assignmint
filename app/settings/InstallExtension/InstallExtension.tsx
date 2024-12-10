import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { urls } from "@/utils/constants/Constants";
import Link from "next/link";
import React from "react";

export default function InstallExtension() {
  return (
    <Card className="flex flex-col gap-2">
      <CardTitle>Canvas Extension</CardTitle>
      <CardDescription>
        Install the chrome extension to import assignments with a just few
        clicks
      </CardDescription>

      <Link href={urls.CHROME_EXTENSION} target="_blanks">
        <button className="w-full btn">Install the extension</button>
      </Link>
    </Card>
  );
}
