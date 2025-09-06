import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import React from "react";

export default function IssuesAndHelp() {
  return (
    <Card className="flex flex-col gap-2">
      <CardTitle>Issues/Suggestions</CardTitle>
      <CardDescription>
        We are always trying to get better, so if you run into any issues or
        have any suggestions, feel free to reach out to me at
      </CardDescription>
      <CardDescription className="text-white font-bold">
        sanchezraphael0@gmail.com
      </CardDescription>

      {/* <div className="flex flex-col"> */}
      {/* <div className="self-center rounded-full overflow-hidden my-12">
          <Image src={defaultImage} alt="Profle image" width={120} />
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <h3 className="text-xl font-semibold">{fullName}</h3>
          <h3 className="text-sm">{email}</h3>
        </div>
      </div>
      <form action={logoutRoute} method="post">
        <button className="btn w-full mt-2" type="submit">
          Logout
        </button>
      </form> */}
    </Card>
  );
}
