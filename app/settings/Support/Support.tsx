import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function Features() {
  return (
    <Card className="flex flex-col gap-2">
      <CardTitle>Want to support us?</CardTitle>
      <CardDescription>
        We are just two people working on this because we want to make it
        better. If you like what we are doing and want to support us, we would
        really appreciate it!
      </CardDescription>
      <CardFooter className="flex justify-center">
        <Link href="https://buymeacoffee.com/raphaelsanchez" target="_blank">
          <Image
            src="/images/buy-me-a-coffee.png"
            width={200}
            height={50}
            alt="Buy me a coffee donation link"
          />
        </Link>
      </CardFooter>
    </Card>
  );
}
