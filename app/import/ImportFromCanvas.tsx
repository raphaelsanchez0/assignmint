import React, { Suspense } from "react";
import { ImportAssignmentsContextProvider } from "./ImportAssignmentsContext";
import AssignmentsFromCanvas from "./AssignmentsFromCanvas";

export default function ImportFromCanvas() {
  return (
    <ImportAssignmentsContextProvider>
      <Suspense>
        <AssignmentsFromCanvas />
      </Suspense>
    </ImportAssignmentsContextProvider>
  );
}
