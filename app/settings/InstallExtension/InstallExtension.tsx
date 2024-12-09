import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default function InstallExtension() {
  return (
    <Card>
      <h3 className="card-title pb-4">Install the extension</h3>
      <Link href="/articles/how-to-install-the-canvas-assignment-importer">
        <Button>Install the extension</Button>
      </Link>
    </Card>
  );
}
